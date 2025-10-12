import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";


export function SignUp() {

    const navigate = useNavigate()

    const { token, setToken, docId, setDocId } = useAuth()

    const [user, setUser] = useState({
        name: "",
        address: "",
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            signUpCall()
        } catch (error) {
            console.error(error.message)
        }
    };

    async function signUpCall() {

        const response = await fetch(
            "http://localhost:8080/signup/doctor",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

        const data = await response.json();
        setToken(data.token)
        navigate("/appt")
    }


    return (
        <div>
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
                    <input name="address" placeholder="Address" value={user.address} onChange={handleChange} required />
                    <input name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
                    <input name="password" placeholder="Password" value={user.password} onChange={handleChange} required type="password" />
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );

}