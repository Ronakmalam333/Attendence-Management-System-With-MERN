import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./register.css";

const Register = () => {

  

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registerData, setRegister] = useState(null);

  const onSubmit = (data) => {
    setRegister(data);
    console.log("Registered Data:", data);
  };

  const password = watch("password");

  return (
    <div className="register-container">

      <div className="signup-img-contain">

      </div>

      <div className="signup">
        <h1>Create Account</h1>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="role-input">
            <label>
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="student"
              />{" "}
              Student
            </label>
            <label>
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="staff"
              />{" "}
              Staff
            </label>
          </div>

          <div className="input-group">
            <input
              {...register("firstname", { required: "First name is required" })}
              type="text"
              placeholder="First Name"
              style={{ border: `${errors.firstname ? "2px solid red" : "2px solid #ddd"}` }}
            />

            <input
              {...register("lastname", { required: "Last name is required" })}
              type="text"
              placeholder="Last Name"
              style={{ border: `${errors.lastname ? "2px solid red" : "2px solid #ddd"}` }}
            />

          </div>

          <div className="input-group">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              style={{ border: `${errors.email ? "2px solid red" : "2px solid #ddd"}` }}
            />

          </div>


          <div className="input-group">
            <input
              {...register("uid", {
                required: "UID is required",
                minLength: {
                  value: 6,
                  message: "UID must be at least 6 characters",
                },
              })}
              type="text"
              placeholder="UID"
              style={{ border: `${errors.uid ? "2px solid red" : "2px solid #ddd"}` }}
            />

          </div>

          <div className="input-group">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              type="password"
              placeholder="Password"
              style={{ border: `${errors.password || errors.confirmpassword ? "2px solid red" : "2px solid #ddd"}` }}
            />

          </div>

          <div className="input-group">
            <input
              {...register("confirmpassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              style={{ border: `${errors.confirmpassword ? "2px solid red" : "2px solid #ddd"}` }}
            />

          </div>
          <button type="submit">Register</button>
        </form>     
        or
        <div className="signin-btn">
          Already Have An Account <span onClick={() => navigate('/signin')}>Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
