import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ NAYI STATE

    const [activeRole, setActiveRole] = useState(null);

    const isAuthenticated = !!user;

    useEffect(() => {

        const savedUser = localStorage.getItem("user");
        const savedRoles = localStorage.getItem("role");
        const savedActiveRole = localStorage.getItem("activeRole");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (savedRoles) {
            setRole(JSON.parse(savedRoles));
        }

        if (savedActiveRole) {
            setActiveRole(savedActiveRole);
        }
         setLoading(false); // ✅ Check complete hone ke baad loading false karein

    }, []);
    const logout = () => {
        setUser(null)
        setRole([])
        setActiveRole(null)
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("activeRole");
        navigate("/login");
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                activeRole,
                isAuthenticated,
                setUser,
                setRole,
                setActiveRole,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;