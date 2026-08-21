/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Offer from "./Offer";
import Rent from "./Rent";
import Location from "./Location";
import Contact from "./Contact";
import EV from "./Evcar";
import Fuel from "./Fuel";
import BigBike from "./Bigbikes";
import Privacy from "./Privacy";
import Term from "./Term";
import { Login } from "./Login";
import Dashboard from "./admin/Dashboard";
import { useEffect, useState } from "react";
import Account from "./Account";
const API_URL = "https://odemine.pythonanywhere.com/api/vehicles/";

// Wrapper component to safely check the current path using standard React Router hooks
function AppContent({ user, handleLoginSuccess, handleLogout }) {
  const location = useLocation();
  const isDashboard = location.pathname.toLowerCase() === "/dashboard";

  return (
    <>
      {/* Only render the public navbar if we are NOT on the dashboard layout view */}
      {!isDashboard && (
        <nav className="navbar">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-car-side" />
            </div>
            ODEMINE
          </Link>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/offer">Offers</NavLink>
            </li>
            <li>
              <NavLink to="/rents">Rents</NavLink>
            </li>
            <li>
              <NavLink to="/location">Locations</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            {user ? (
              <li>
                <NavLink
                  to="/account"
                  className="nav-account-btn"
                  style={{ color: "#ff003c", fontWeight: "bold" }}
                >
                  Account
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="nav-login-btn"
                  style={{
                    backgroundColor: "#ff003c",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 10px rgba(255, 0, 60, 0.3)",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Login / Register
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}

      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="offer" element={<Offer />} />
          <Route path="location" element={<Location />} />
          <Route path="contact" element={<Contact />} />
          <Route path="ev" element={<EV />} />
          <Route path="fuel" element={<Fuel />} />
          <Route path="bigbike" element={<BigBike />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="term" element={<Term />} />
          <Route
            path="login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          {user && user.role === "admin" && (
            <Route path="dashboard" element={<Dashboard />} />
          )}
          <Route path="rents" element={<Rent user={user} />} />
          <Route
            path="/account"
            element={<Account user={user} handleLogout={handleLogout} />}
          />
        </Routes>
      </section>

      {/* Only render the consumer footer if we are NOT on the dashboard view layout */}
      {!isDashboard && (
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <div className="logo-icon">
                  <i className="fas fa-car-side" />
                </div>
                ODEMINE
              </Link>
              <p>
                Your trusted partner for premium vehicle rentals. Drive your
                dreams with us.
              </p>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/term">Terms and Conditions</Link>
            </div>

            <div className="footer-col">
              <h4>Navigate</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/offer">Special Offers</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="social-row">
                <a className="social-btn" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="social-btn" href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a className="social-btn" href="#">
                  <i className="fab fa-tiktok" />
                </a>
                <a className="social-btn" href="#">
                  <i className="fab fa-telegram" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Odemine. All rights reserved.</p>
            <p style={{ color: "#555", fontSize: "0.8rem" }}>
              Drive Your Dreams
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const role = localStorage.getItem("userRole");
      const email = localStorage.getItem("userEmail");
      setUser({ email, role });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <AppContent
        user={user}
        handleLoginSuccess={handleLoginSuccess}
        handleLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

export default App;
