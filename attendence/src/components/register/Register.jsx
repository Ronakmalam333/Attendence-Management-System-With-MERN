import React, { useState } from "react";
import "./register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!name) {
      setError((prevError) => ({ ...prevError, name: "Please enter your Name" }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, name: "" }));
    }

    if (!email) {
      setError((prevError) => ({ ...prevError, email: "Please enter your Email"
      }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
    }


    if (!uid) {
      setError((prevError) => ({ ...prevError, uid: "Please enter your UID" }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, uid: "" }));
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

    if (!confirmpassword) {
      setError((prevError) => ({
        ...prevError,
        confirmpassword: "Please confirm your password",
      }));
      hasError = true;
    } else if (password !== confirmpassword) {
      setError((prevError) => ({
        ...prevError,
        confirmpassword: "Passwords do not match",
      }));
      hasError = true;
    } else {
      setError((prevError) => ({ ...prevError, confirmpassword: "" }));
    }

    if (!hasError) {
      setFormData({ uid, password, name, email});
      console.log("Form Data Submitted:", { uid, password });
    }
  };

  return (
    <div className='register'>
      <h1>Register User</h1>
      <form id='form' onSubmit={handleSubmit}>
      <label htmlFor='name'>
          Name:
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your Name.....'
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p style={{ color: "red" }}>{error.name}</p>}
        </label>
        <label htmlFor='uid'>
          UID:
          <input
            type='text'
            id='uid'
            name='uid'
            value={uid}
            placeholder='Enter your UID.....'
            onChange={(e) => setUid(e.target.value)}
          />
          {error.uid && <p style={{ color: "red" }}>{error.uid}</p>}
        </label>
        <label htmlFor='email'>
          Email:
          <input
            type='text' 
            id='email'
            name='email'
            value={email}
            placeholder='Enter your Email.....'
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}
        </label>
        <label htmlFor='password'>
          Password:
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Enter your password.....'
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
        </label>
        <label htmlFor='confirm-password'>
          Confirm Password:
          <input
            type='password'
            id='confirm-password'
            name='confirm-password'
            value={confirmpassword}
            placeholder='Confirm your password.....'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error.confirmpassword && (
            <p style={{ color: "red" }}>{error.confirmpassword}</p>
          )}
        </label>
        <button type='submit'>Submit</button>
      </form>
      {formData.uid && (
        <div className='success-message'>
          <h3>Form Submitted Successfully</h3>
          <p>Name: {formData.name}</p>
          <p>UID: {formData.uid}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
}

export default Register;
