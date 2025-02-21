import { Link, useLocation } from "react-router-dom";
import { Button } from "../../common/Button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const location = useLocation();
  const auth = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-gray-900"
      : "text-gray 500 hover:text-gray-900";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="text-xl font-bold text-gray-800">
              RentEase
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className={`text-base font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link
              to="/properties"
              className={`text-base font-medium ${isActive("/properties")}`}
            >
              Properties
            </Link>
            <Link
              to="/about"
              className={`text-base font-medium ${isActive("/about")}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-base font-medium ${isActive("/contact")}`}
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link to="/auth/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/auth/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
