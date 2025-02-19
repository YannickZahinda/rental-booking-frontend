import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { Children } from "react";
import { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // const { token } = useAuth();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    })

    console.log("Check auth.user: %%%%%%%%%%%%%%%%%%%: ", user);
    if (isLoading) {
        return <div>Loading......</div>
    }
    if(user === null) {
        console.log("🔒 User not authenticated, redirecting to login...");
        return <Navigate to="/login" />
    }
    
    console.log("✅ Authenticated user:", user);
    return children;
}

export default ProtectedRoute;