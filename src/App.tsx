import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login/Login";
import HostDashboard from "./pages/Dashboard/host-dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import PropertiesPage from "./pages/PropertiesPage/PropertiesPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage/PropertyDetailsPage";
import About from "./pages/About/About";
import ContactPage from "./pages/ContactPage/ContactPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RenterDashboard from "./pages/Dashboard/renter-dashboard";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Layout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="properties/:id" element={<PropertyDetailsPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="/host-dashboard"
        element={
          <ProtectedRoute role="host">
            <HostDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/renter-dashboard"
        element={
          <ProtectedRoute role="renter">
            <RenterDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
