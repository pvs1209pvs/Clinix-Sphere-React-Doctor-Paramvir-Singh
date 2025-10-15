import './App.css';
import { Pres } from './Pres';
import { Appt } from './Appt';
import { NavLink, Route, Routes } from 'react-router-dom';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { useAuth } from './AuthProvider';

export const inputStyle = {
	padding: "8px",
	borderRadius: "8px",
	border: "1px solid",
}

export const buttonStyle = {
	padding: "8px",
	borderRadius: "8px",
	backgroundColor: "#333",
	color: "#fff",
}

export const thStyle = { padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }
export const trStyle = { padding: "16px" }

export const tableStyle = {
	width: "100%",
	borderCollapse: "collapse",
	marginBottom: "16px",
	backgroundColor: "#fff",
	borderRadius: "8px",
}

const navLinkStyle = {
	textDecoration: "none",
	padding: "16px",
	borderRadius: "8px",
	border: "1px solid",
};

function App() {

	const { token } = useAuth()

	return (

		<div style={{ minHeight: "100vh" }}>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "16px",
					alignItems: "center",
					background: "#e6e1e1ff"

				}}
			>

				<h1>
					Welcome to Clinix Sphere
				</h1>

				<div style={{
					display: "flex",
					justifyContent: "space-evenly",
					padding: "16px",
					gap: "8px"

				}}>


					{
						token &&
						<NavLink
							to="/appt"
							style={navLinkStyle}
							onMouseOver={(e) => (e.target.style.backgroundColor = "#eee")}
							onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
						>
							View Appointments
						</NavLink>
					}


					{
						!token &&
						<>
							<NavLink
								to="/signup"
								style={navLinkStyle}
								onMouseOver={(e) => (e.target.style.backgroundColor = "#eee")}
								onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
							>
								Sign Up
							</NavLink>

							<NavLink
								to="/signin"
								style={navLinkStyle}
								onMouseOver={(e) => (e.target.style.backgroundColor = "#eee")}
								onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
							>
								Sign In
							</NavLink>
						</>
					}



				</div>


			</div>

			<Routes>
				<Route path="/appt" element={<Appt />} />
				<Route path="/pres" element={<Pres />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</div>
	);
}


export default App
