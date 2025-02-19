import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    uid: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let hasError = false;

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      hasError = true;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      hasError = true;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      hasError = true;
    }
    if (!formData.uid) {
      const uidPattern = /^\d{2}[a-z]{2,5}\d{3}$/i;
      errors.uid = !uidPattern.test(formData.uid) ? "Invalid UID" : "";
      hasError = true;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      hasError = true;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setError(errors);
    } else {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div className='register-container'>
      <button className='back-btn' onClick={() => navigate("/")}>Back</button>
      <div className='register-form'>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
            />
            {error.firstName && <p className='error-message'>{error.firstName}</p>}
          </div>
          <div className='input-group'>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
            />
            {error.lastName && <p className='error-message'>{error.lastName}</p>}
          </div>
          <div className='input-group'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className='error-message'>{error.email}</p>}
          </div>
          <div className='input-group'>
            <input
              type='text'
              name='uid'
              placeholder='UID'
              value={formData.uid}
              onChange={handleChange}
            />
            {error.uid && <p className='error-message'>{error.uid}</p>}
          </div>
          <div className='input-group'>
            <label>
              <input
                type='radio'
                name='role'
                value='student'
                checked={formData.role === "student"}
                onChange={handleChange}
              /> Student
            </label>
            <label>
              <input
                type='radio'
                name='role'
                value='staff'
                checked={formData.role === "staff"}
                onChange={handleChange}
              /> Staff
            </label>
          </div>
          <div className='input-group'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && <p className='error-message'>{error.password}</p>}
          </div>
          <div className='input-group'>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <p className='error-message'>{error.confirmPassword}</p>
            )}
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};
{
  /*
  add firstname lastname input field
  add radio button for staff or student
  add confirm password field

  structure

  first name -- last name 
  email
  uid
  *staff *student
  password
  confirm password
  submit button
  and handle all elements errors...
  */
}

export default Register;
