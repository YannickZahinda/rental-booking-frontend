import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: any;
    // token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode}) => {
    const [user, setUser] = useState<any>(null);
    // const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    // const navigate = useNavigate();

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

    const fetchUser = async (token: string) => {
        try {
            const { data } = await axios.get("http:locahost:3000/users/me", {
                headers: {Authorization: `Bearer ${token}`},
            });
           setUser(data);
        } catch (error) {
            console.log("Error occured while fetching user: ", error);
            setUser(null);
        }
    };

   

    const login = (token: string) => {
        localStorage.setItem("jwtToken", token);
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser(decoded);
    };

    const logout = async() => {
       localStorage.removeItem("jwtToken");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

// export const useAuth = () => useContext(AuthContext);

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used with an AuthProvider")
    }
    return context;
}