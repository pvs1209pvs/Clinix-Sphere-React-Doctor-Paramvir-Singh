import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export function Appt() {

    const navigate = useNavigate()
    const { token, setToken, docId, setDocId } = useAuth()
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
            throw new Error(response.status)
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
        setToken(null)
        setDocId(null)
        navigate("/signin")
    }

    return (
        <>

            {
                !token &&
                <h3>You need to login before you can proceed.</h3>
            }
            {
                token &&
                appt.length == 0 &&
                <div>
                    <h3>Welcome Dr {docId}</h3>
                    <h3>All appointments are complete. You are all caught up!</h3>
                    <button onClick={signOutDoctor}>Sign Out</button>
                </div>

            }

            {
                token &&
                appt.length > 0 &&
                <div>
                    <h3>Welcome Dr {docId}</h3>
                    <table border="1" cellPadding="5" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {appt.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.doctorName}</td>
                                    <td>{item.forPatient}</td>
                                    <td>{item.status}</td>
                                    <td>{item.time}</td>
                                    <td><button onClick={() => buttonOnClick(appt[index])}>Complete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={signOutDoctor}>Sign Out</button>

                </div>

            }
        </>
    )

}