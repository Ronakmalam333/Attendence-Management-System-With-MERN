import React, { useState } from "react";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter your Email id",
      }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
    }
    if (!uid) {
      setError((prevError) => ({ ...prevError, uid: "Please enter your UID" }));
      hasError = true;
    } else {
      const pattern = /^\d{2}[a-z]{2,5}\d{3}$/i;
      if (!pattern.test(uid)) {
        setError((prevError) => ({
          ...prevError,
          uid: "Please enter a valid UID",
        }));
        hasError = true;
      } else {
        setError((prevError) => ({ ...prevError, uid: "" }));
      }
    }

    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: "Please enter your password",
      }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, password: "" }));
    }

    if (!hasError) {
      setFormData({ email, uid, password });
      console.log("Form Data Submitted:", { email, uid, password });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 id="title">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="uid"
              value={uid}
              placeholder="UID"
              onChange={(e) => setUid(e.target.value)}
              id="uid-input"
            />
            {error.uid && <p className="error-message">{error.uid}</p>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
            />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>
          <button type="submit" id="register-btn">Register</button>
        </form>
        {formData.uid && (
          <div className="success-message">
            <h3>Registration Successful!</h3>
            <p>Email: {formData.email}</p>
            <p>UID: {formData.uid}</p>
            <p>Password: {formData.password}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
