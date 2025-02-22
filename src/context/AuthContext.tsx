import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Property {
  id: string;
  name: string;
  location: string;
  price_per_night: number;
}

interface Booking {
  id: string;
  propertyId: string;
  check_in: string;
  check_out: string;
  status: "pending" | "confirmed" | "canceled";
}

interface User {
  id: number;
  email: string;
  name: string;
  role: "renter" | "host";
  accessToken: string,
  refreshToken: string;
  properties?: Property[];
  bookings?: Booking[];
}

// interface AuthResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
// }

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log(
      "Initial auth check - Access token: ",
      token ? "exists" : "not found"
    );

    if (token) {
      try {
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token has expired. Logging out...");
          localStorage.removeItem("token");
          setUser(null);
        // logout();
        }else {
            setUser({
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
                refreshToken: decoded.refreshToken,
                accessToken: decoded.accessToken,
                properties: decoded.properties,
                bookings: decoded.bookings
            });
        }
      } catch (error) {
        console.log("Invalid token: ", error);
        localStorage.removeItem("jwtToken");
        setUser(null)
     
      }
    }
  }, []);

  const login = (token: string) => {

    localStorage.setItem("jwtToken", token);
    const decoded = JSON.parse(atob(token.split(".")[1]));

    setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        refreshToken: decoded.refreshToken,
        accessToken: decoded.accessToken,
        properties: decoded.properties,
        bookings: decoded.bookings
    });

  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
}
