import React, { useState } from "react";
import "./register.css";

function Register() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!uid) {
      setError((prevError) => ({ ...prevError, uid: "Please enter your UID" }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, uid: "" }));
    }

    if (!password) {
      setError((prevError) => ({...prevError, password: "Please enter your password",}));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, password: "" }));
    }

    if (!hasError) {
      setFormData({ uid, password });
      console.log("Form Data Submitted:", { uid, password });
    }
  };

  return (
    <div className='register'>
      <h1>Register User</h1>
      <form id='form' onSubmit={handleSubmit}>
        <label htmlFor='uid'>
          UID:
          <input type='text' id='uid' name='uid' value={uid} placeholder='Enter your UID...' onChange={(e) => setUid(e.target.value)} />
          {error.uid && <p style={{ color: "red" }}>{error.uid}</p>}
        </label>
        <label htmlFor='password'>
          Password:
          <input type='password' id='password' name='password' value={password} placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)}/>
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
        </label>
        <button type='submit'>Submit</button>
      </form>
      {formData.uid && (
        <div className='success-message'>
          <h3>Form Submitted Successfully</h3>
          <p>UID: {formData.uid}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
}

export default Register;
