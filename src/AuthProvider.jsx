import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [docId, setDocId] = useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken, docId, setDocId }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
} 