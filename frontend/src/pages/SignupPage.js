import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: parseInt(form.age) }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="content-box">
        <div className="image-section">
          <img src="/signup.jpeg" alt="signup illustration" />
        </div>
        <div className="form-section">
          <h1 className="title">Create Account</h1>
          <p className="subtitle">Join us today and start your journey</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={form.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="signup-btn" type="submit">
              Create Account
            </button>
          </form>

          <div className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login here</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;