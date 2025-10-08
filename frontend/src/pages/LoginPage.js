import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="left-section">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="email"
                name="email"
                placeholder="Username or email"
                value={form.email}
                onChange={handleChange}
                required
                aria-label="email"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                aria-label="password"
              />
            </div>

            {error && <div className="error-message" role="alert">{error}</div>}
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="signup-text">
            Don’t have an account?
            <span className="signup-link" onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </div>
        </div>

        <div className="right-section">
          <div className="wave-decoration" />
          <div className="pharmacy-shelf">
            <div className="shelf-item" />
            <div className="shelf-item" />
            <div className="shelf-item" />
          </div>
          <div className="plus-sign">+</div>
          <div className="illustration-wrapper">
            <img
              className="illustration-image"
              src="/login.jpeg"
              alt="Pharmacist Platform Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;