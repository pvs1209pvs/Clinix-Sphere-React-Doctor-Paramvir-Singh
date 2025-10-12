import './App.css';
import { Pres } from './Pres';
import { Appt } from './Appt';
import { NavLink, Route, Routes } from 'react-router-dom';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

function App() {


	return (
	<div>
			
			<div style={{
				display:"flex",
				flexDirection: "row",
				gap: "8px"
			}}>

				<NavLink to="/appt">View Appointments</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
				<NavLink to="/signin">Sign In</NavLink>

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
