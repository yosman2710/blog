
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, FileText } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/posts" className="navbar-logo">
              BlogApp
            </Link>
            <div className="navbar-nav">
              <Link
                to="/posts"
                className={`navbar-link ${location.pathname === '/posts' ? 'active' : ''}`}
              >
                <FileText size={16} />
                <span>Posts</span>
              </Link>
            </div>
          </div>
          
          <div className="navbar-right">
            <span className="navbar-greeting">Hola, {user.name}</span>
            <Link
              to="/profile"
              className={`navbar-profile-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              <User size={20} />
            </Link>
            <button
              onClick={handleLogout}
              className="navbar-logout-btn"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
