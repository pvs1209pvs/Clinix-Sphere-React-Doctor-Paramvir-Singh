import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(sessionStorage.getItem("jwt") || null);
    const [docId, setDocId] = useState(sessionStorage.getItem("doc") || null);

    function saveLogin(d) {
        setToken(d.token)
        setDocId(d.doctorId)
        sessionStorage.setItem("jwt", d.token)
        sessionStorage.setItem("doc", d.doctorId)
    }

    function delLogin(){
        setToken(null)
        setDocId(null)
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("doc")
    }

    return (
        <AuthContext.Provider value={{ token, setToken, docId, setDocId, saveLogin, delLogin }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
} 