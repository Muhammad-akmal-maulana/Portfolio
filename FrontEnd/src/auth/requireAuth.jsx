import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function isTokenValid(token) {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        // exp dalam detik
        return payload.exp && Date.now() < payload.exp * 1000;
    } catch {
        return false;
    }
}

function RequireAuth({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!isTokenValid(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;