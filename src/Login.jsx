import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit

    // ========================================================
    // 1. REGISTRATION FLOW (When user is on the Register view)
    // ========================================================
    if (isRegister) {
      // Get the list of already registered users, or an empty list if none exist yet
      const existingUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Check if this email is already taken
      const userExists = existingUsers.some((user) => user.email === email);
      if (userExists) {
        setErrorMessage("This email is already registered. Please log in.");
        return;
      }

      // Save the new user profile into our local storage list
      const newUser = { email, password, fullname, phone };
      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      // Sync the user registration profile to the backend customer database API
      fetch("https://odemine.pythonanywhere.com/api/customer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          phone: phone,
        }),
      }).catch((err) => {
        console.error(
          "Failed syncing registered profile to backend API container:",
          err,
        );
      });

      alert("Registration successful! You can now log in.");

      // Switch them automatically to the Login view and reset fields
      setIsRegister(false);
      setFullname("");
      setPhone("");
      setPassword("");
      return;
    }

    // ========================================================
    // 2. ADMIN LOGIN FLOW
    // ========================================================
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminData = { email: email, role: "admin" };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", email);

      onLoginSuccess(adminData);
      navigate("/dashboard");
      return;
    }

    // ========================================================
    // 3. STANDARD CUSTOMER LOGIN FLOW (Checks if they registered)
    // ========================================================
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Find a registered user that matches BOTH the typed email and password
    const validUser = registeredUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (validUser) {
      // Found them! Log them in safely
      const userData = { email: validUser.email, role: "customer" };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "customer");
      localStorage.setItem("userEmail", validUser.email);
      localStorage.setItem("userPhone", validUser.phone);
      localStorage.setItem("userFullname", validUser.fullname); // Lowercase 'n' to match state

      onLoginSuccess(userData);
      navigate("/");
    } else {
      // No match found or they never registered
      setErrorMessage(
        "Account not found or wrong password! Please register first.",
      );
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className="auth-overlay">
        <div className="auth-modal">
          <div className="auth-header">
            <h2>{isRegister ? "REGISTER" : "LOGIN"}</h2>
            <p>Welcome to ODEMINE Supercar Rentals</p>
          </div>

          {/* Show the error message to the user if login/registration fails */}
          {errorMessage && (
            <div
              style={{
                color: "#ff003c",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "15px",
              }}
            >
              <i
                className="fas fa-exclamation-circle"
                style={{ marginRight: "5px" }}
              ></i>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required={isRegister}
                  style={{ color: "var(--muted)" }}
                />
              </div>
            )}

            {isRegister && (
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+855 XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={isRegister}
                  style={{ color: "var(--muted)" }}
                />
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ color: "var(--muted)" }}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ color: "var(--muted)" }}
              />
            </div>

            <button type="submit" className="auth-btn">
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="switch-form">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account yet?"}
            <span
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMessage(""); // clear errors when switching tabs
                if (isRegister) {
                  setFullname("");
                  setPhone("");
                }
              }}
            >
              {isRegister ? " Log In" : " Register Now"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
