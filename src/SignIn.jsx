import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { buttonStyle, inputStyle } from "./App";

export function SignIn() {

    const navigate = useNavigate()
    const { saveLogin } = useAuth()

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
            // "http://localhost:8080/login/doctor",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

        if (response.ok) {
            const data = await response.json();
            saveLogin(data)
            navigate("/appt")
        }
        else if(response.status==401){
            alert("Invalid credentials.")
        }
        else if(response.status>=500){
            alert("Something went wrong.")
        }

    }


    return (
        <div
            style={{
                 paddingTop: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    padding: "36px",
                    borderRadius: "8px",
                    border: "1px solid",
                    width: "360px",
                    textAlign: "center",
                }}
            >

                <h2 style={{ marginBottom: "24px", color: "#222" }}>Log In</h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    <input
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        autoCapitalize="false"
                        autoCorrect="false"
                        style={inputStyle}
                    />

                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={user.password}
                        autoCapitalize="false"
                        autoCorrect="false"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );


}