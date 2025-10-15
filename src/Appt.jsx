import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { buttonStyle, tableStyle, thStyle, trStyle } from './App';

export function Appt() {

    const navigate = useNavigate()
    const { token, docId, delLogin } = useAuth()
    const [appt, setAppt] = useState([])

    async function fetchAppt() {

        console.log("fetcing appts for doc id " + docId)
        const params = new URLSearchParams();
        params.append("docId", docId)

        const response = await fetch(
            `https://clinix-sphere-express-backend-param.vercel.app/appt?${params}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!response.ok) {
            alert("Something went wrong.")
        }

        return await response.json()

    }

    useEffect(() => {

        async function fetchApptCall() {

            try {
                const data = await fetchAppt()
                console.log(data)
                setAppt(data)
            } catch (error) {
                console.error(error.message)
            }

        }

        fetchApptCall()


    }, [])

    function buttonOnClick(data) {
        console.log("sending data")
        console.log(data)
        navigate("/pres", {
            state: {
                currentAppt: data,
            }
        })
    }

    function signOutDoctor() {
        delLogin()
        navigate("/signin")
    }


    return (
        <>

            {
                !token &&
                navigate("/signin")
            }

            {
                token &&
                appt.length == 0 &&
                <div style={{ padding: "24px" }}>
                    <h2>All appointments are complete. You are all caught up!</h2>
                    <button onClick={signOutDoctor} style={buttonStyle}>Sign Out</button>
                </div>

            }

            {
                token &&
                appt.length > 0 &&

                <div style={{ padding: "24px" }}>

                    <h2 style={{ marginBottom: "16px", color: "#222" }}>Pending Appointments</h2>

                    <table style={tableStyle}>
                        <thead style={{ backgroundColor: "#eee" }}>
                            <tr>
                                <th style={thStyle}>Doctor Name</th>
                                <th style={thStyle}>Patient Name</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Time</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appt.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={trStyle} >{item.doctorName}</td>
                                    <td style={trStyle}>{item.forPatient}</td>
                                    <td style={trStyle}>{item.status}</td>
                                    <td style={trStyle}>{item.time}</td>
                                    <td >
                                        <button
                                            onClick={() => buttonOnClick(appt[index])}
                                            style={buttonStyle}
                                            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
                                            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
                                        >
                                            Complete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        onClick={signOutDoctor}
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
                    >
                        Sign Out
                    </button>

                </div>


            }
        </>
    )

}