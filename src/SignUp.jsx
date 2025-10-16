import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { buttonStyle, inputStyle } from "./App";


export function SignUp() {

    const navigate = useNavigate()

    const { saveLogin } = useAuth()

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
            "https://clinix-sphere-express-backend-param.vercel.app/signup/doctor",
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
        else if (response.status == 400) {
            alert("Username alrady exists")
        }
        else if (response.status >= 500) {
            alert("Something went wrong")
        }

    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "10vh",

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
                <h2 style={{ marginBottom: "24px" }}>Sign Up</h2>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                    <input
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        value={user.address}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        name="username"
                        placeholder="Username"
                        required
                         type="text"
  inputMode="text"
  autoCapitalize="none"
  autoCorrect="off"
  spellCheck="false"
                        value={user.username}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={user.password}
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
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );


}