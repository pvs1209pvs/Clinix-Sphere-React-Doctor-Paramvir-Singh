import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function Pres() {

    const { token } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()

    const [pres, setPres] = useState({
        forPatient: location.state.currentAppt.forPatient,
        symptoms: "",
        diagnosis: "",
        medName: "",
        medDose: "",
        medDur: "",
        notes: "",
        forAppt: location.state.currentAppt._id,
        _id: ""
    })

    console.log("crent data")
    console.table(location.state.currentAppt.forPatient)



    async function addPres() {

        const response = await fetch(
            "https://clinix-sphere-express-backend-param.vercel.app/pres",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(pres)
            })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        console.log("Pres added to mongo:", pres)

    }

    async function markAppointmentAsCompleted() {

        const response = await fetch(
            `https://clinix-sphere-express-backend-param.vercel.app/appt/update/${pres._id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        console.log(`${pres._id} App mark as completed`)

    }

    useEffect(() => {
        const copyPres = { ...pres }
        copyPres.forPatient = location.state.currentAppt.patientName
        copyPres._id = location.state.currentAppt._id
        setPres(copyPres)
    }, [])

    useEffect(() => {
        console.log("nice ", pres)
    }, [pres])

    const handleChange = (e) => {
        setPres({ ...pres, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPres()
        markAppointmentAsCompleted()
        navigate(-1)
    };


    return (
        <div>
            <div>
                <h2>Create Prescription</h2>
                <form onSubmit={handleSubmit}>
                    <input name="patientName" placeholder="Patient Name" value={pres.forPatient} required readOnly />
                    <input name="symptoms" placeholder="Symptoms" value={pres.symptoms} onChange={handleChange} required />
                    <input name="diagnosis" placeholder="Diagnosis" value={pres.diagnosis} onChange={handleChange} required />
                    <input name="medName" placeholder="Med Name" value={pres.medName} onChange={handleChange} required />
                    <input name="medDose" placeholder="Med Dose" value={pres.medDose} onChange={handleChange} required />
                    <input name="medDur" placeholder="Med Duration" value={pres.medDur} onChange={handleChange} required />
                    <input name="notes" placeholder="Notes" value={pres.notes} onChange={handleChange} required />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
