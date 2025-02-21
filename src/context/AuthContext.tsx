import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: any;
    // token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode}) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log("Checking token in localStorage: ", token);
        
        if(token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                if(decoded.exp * 1000 < Date.now()){
                    console.warn("Token has expired. Logging out...")
                    localStorage.removeItem("token");
                    setUser(null)
                } else {
                    setUser(decoded)
                }
            
            } catch (error) {
                console.log("Invalid token$$$$$$$$$$$$$$: ", error);
                localStorage.removeItem("jwtToken");
                
            }
        }
    }, []);

   

    const login = (token: string) => {
        localStorage.setItem("jwtToken", token);
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser(decoded);
    };

    const logout = async() => {
       localStorage.removeItem("jwtToken");
        setUser(null);
    }

    const isAuthenticated = () => {
        return user !== null;
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used with an AuthProvider")
    }
    return context;
}