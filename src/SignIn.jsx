import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function SignIn() {

    const navigate = useNavigate()
    const { token, setToken, docId, setDocId } = useAuth()

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            signInApiCall()
        } catch (error) {
            console.error(error.message)
        }
    };

    async function signInApiCall() {

        const response = await fetch(
            "https://clinix-sphere-express-backend-param.vercel.app/login/doctor",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

        if (response.ok) {
            const data = await response.json();
            setToken(data.token)
            setDocId(data.doctorId)
            navigate("/appt")
        }

    }


    return (
        <div>
            <div>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
                    <input name="password" placeholder="Password" value={user.password} onChange={handleChange} required type="password"/>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );

}