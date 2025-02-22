import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { Children } from "react";
import { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role?: "host" | "renter" }) => {
    // const { token } = useAuth();
    const { user, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const checkAuth = async () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        checkAuth();
    }, [])

    console.log("Check auth.user: %%%%%%%%%%%%%%%%%%%: ", user);
    if (isLoading) {
        return <div>Loading......</div>
    }

    if(!isAuthenticated()) {
        console.log(" User not authenticated, redirecting to login...");
        return <Navigate to="/login" />
    }

    
    console.log("✅ Authenticated user:", user);
    if(role && user?.role !== role) {
        return <Navigate to={user?.role === "host" ? "/host-dashboard" : "/renter-dashboard"} />
    }
    
    return children;
}

export default ProtectedRoute;