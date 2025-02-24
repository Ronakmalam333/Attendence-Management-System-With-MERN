import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./register.css";

const Register = () => {
  const [isCourseBox, setCourseBox] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const courseBox = (e) => {
    e.preventDefault();
    setCourseBox(true);
  };

  const hideCourseBox = (e) => {
    e.preventDefault();
    if (e.target.closest(".course-input-contain")) return;
    setCourseBox(false);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setValue("course", course);
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setValue("semister", semester);
    setCourseBox(false);
  };

  const onSubmit = (data) => {
    console.log("Registered Data:", data);
    // Add your submission logic here
  };

  const password = watch("password");

  return (
    <div className="register-container">
      <div className="signup-img-contain"></div>

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
            {errors.role && <p className="error">{errors.role.message}</p>}
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
            {errors.firstname && <p className="error">{errors.firstname.message}</p>}
            {errors.lastname && <p className="error">{errors.lastname.message}</p>}
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
            {errors.email && <p className="error">{errors.email.message}</p>}
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
            {errors.uid && <p className="error">{errors.uid.message}</p>}
          </div>

          <div className="input-group">
            <button
              className="course-btn"
              onClick={courseBox}
              style={{ border: `${errors.course || errors.semister ? "2px solid red" : "2px solid #ddd"}` }}
            >
              {selectedCourse || "Select Course"}
              {selectedSemester && ` - Sem ${selectedSemester}`}
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              </span>
            </button>

            <div
              className="course"
              onClick={hideCourseBox}
              style={{ display: `${isCourseBox ? "flex" : "none"}` }}
            >

              <div className="course-input-contain">

                <span style={{position: "absolute", top:"15px", left: "15px", cursor: "pointer"}} onClick={hideCourseBox}>back</span>

                <input
                  {...register("course", { required: "Course is required" })}
                  type="hidden"
                  value={selectedCourse}
                />
                <input
                  {...register("semister", { required: "Semester is required" })}
                  type="hidden"
                  value={selectedSemester}
                />

                <div className="courses">
                  <div>
                    {["B-tech CSE", "B-tech ME", "B-tech ECE", "B-tech Civil", "MCA", "MBA"].map((course) => (
                      <span
                        key={course}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCourseSelect(course);
                        }}
                        className={selectedCourse === course ? "selected" : ""}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sem">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <span
                      key={sem}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSemesterSelect(sem.toString());
                      }}
                      className={selectedSemester === sem.toString() ? "selected" : ""}
                    >
                      {sem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
              style={{ border: `${errors.password ? "2px solid red" : "2px solid #ddd"}` }}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
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
            {errors.confirmpassword && <p className="error">{errors.confirmpassword.message}</p>}
          </div>

          <button type="submit">Register</button>
        </form>

        <div className="signin-btn">
          Already Have An Account <span onClick={() => navigate('/signin')}>Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default Register;