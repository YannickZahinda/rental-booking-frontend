import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:3000/auth/google/callback";

const Login = () => {
  const auth = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("Token from URL", token);

    if (token) {
      localStorage.setItem("jwtToken", token);

      auth?.login(token);

      window.history.replaceState({}, document.title, "/host-dashboard");
      window.location.href = "/host-dashboard";
    }
  }, [auth]);

  const handleGoogleLogin = async () => {
    try {
      window.location.href = API_URL;
    } catch (error) {
      console.log("Google login error $$$$$$$: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Login with Google</h2>
      <button
        className="mt-4 hover:cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
