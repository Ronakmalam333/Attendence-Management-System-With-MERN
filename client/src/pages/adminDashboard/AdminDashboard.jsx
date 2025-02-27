import React, { useContext, useEffect, useState } from 'react';
import './adminDashboard.css';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../components/context/AuthContext';
import LiveAttendence from './live attendence/LiveAttendence';
import { scheduleContext } from '../../components/context/Schedule';

function AdminDashboard() {
  const { register, handleSubmit, setValue } = useForm();
  const [isCourseBox, setCourseBox] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', uid: '' });
  const [date, setDate] = useState(new Date());
  const { token } = useContext(AuthContext);
  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);

  
  useEffect(() => {
    const fetchStaffInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/staff/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStaffInfo(data);
        } else {
          console.error('Failed to fetch staff info:', data.message);
        }
      } catch (error) {
        console.error('Error fetching staff info:', error);
      }
    };

    if (token) {
      fetchStaffInfo();
    }

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [token]);

  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const generateToken = () => {
    if (!selectedCourse || !selectedSemester) {
      alert("Please select course and semester");
      return;
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 4; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedToken(token);
    setValue("generatedtoken", token);
  };

  const courseBox = (e) => {
    e.preventDefault();
    setCourseBox(true);
  };

  const hideCourseBox = (e) => {
    e.preventDefault();
    if (e.target.closest(".course-input-contain")) return;
    setCourseBox(false);
  };

  const handleBackButton = (e) => {
    e.preventDefault();
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

  const day = date.getDay();
  let currentSub;

  switch (day) {
    case 1:
      currentSub = mon;
      break;
    case 2:
      currentSub = tue;
      break;
    case 3:
      currentSub = wed;
      break;
    case 4:
      currentSub = thu;
      break;
    case 5:
      currentSub = fri;
      break;
    default:
      currentSub = leave;
  }

  const sub = currentSub ? currentSub.map(element => element.sub) : [];


  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTime = hours + minutes / 60;
  // const currentTime = 13;

  
  let onTimeSub = "No Classes Found";
  if (currentTime >= 9.25 && currentTime < 10.25) onTimeSub = sub[0] || "No Classes Found"; // 9:15 AM - 10:15 AM
  else if (currentTime >= 10.25 && currentTime < 11.25) onTimeSub = sub[1] || "No Classes Found"; // 10:15 AM - 11:15 AM
  else if (currentTime >= 11.25 && currentTime <= 12.30) onTimeSub = sub[2] || "No Classes Found"; // 11:15 AM - 12:15 PM
  else if (currentTime >= 13 && currentTime < 14) onTimeSub = sub[3] || "No Classes Found"; // 1:00 PM - 2:00 PM
  else if (currentTime >= 14 && currentTime < 15) onTimeSub = sub[4] || "No Classes Found"; // 2:00 PM - 3:00 PM
  else if (currentTime >= 15 && currentTime <= 16) onTimeSub = sub[5] || "No Classes Found"; // 3:00 PM - 4:00 PM

  // console.log(onTimeSub);
  
  const onSubmit = async (data) => {
    const { course, semester, generatedtoken } = data;
    try {
      const response = await fetch('http://localhost:5000/generateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course,
          semester,
          subject: onTimeSub,
          date: new Date().toISOString().split('T')[0],
          generatedtoken
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Token stored:', result);
      } else {
        alert('Failed to store token: ' + result.message);
      }
    } catch (error) {
      console.error('Error storing token:', error);
      alert('Error storing token');
    }
  };

  const handleSubmitAttendence = async (e) => {
    e.preventDefault();
    if (onTimeSub === "No Classes Found") {
      alert("No class is currently scheduled.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/close-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course: selectedCourse,
          semester: selectedSemester,
          subject: onTimeSub,
          date: new Date().toISOString().split('T')[0],
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Attendance session closed and absentees marked');
      } else {
        alert('Failed to close attendance session: ' + result.message);
      }
    } catch (error) {
      console.error('Error closing attendance session:', error);
      alert('Error closing attendance session');
    }
  };

  return (
    <div className='adminDashboard'>
      <div className="admin-contain">
        <div className="token-generate-contain">
          <div className="staff-details">
            <div className="staff-pic"><svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#000000"><path d="M480-504.62q-49.5 0-84.75-35.25T360-624.62q0-49.5 35.25-84.75T480-744.62q49.5 0 84.75 35.25T600-624.62q0 49.5-35.25 84.75T480-504.62ZM200-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q760-306 760-281.23v65.85H200Zm40-40h480v-25.85q0-13.31-8.58-25q-8.57-11.69-23.73-19.77q-49.38-23.92-101.83-36.65q-52.45-12.73-105.86-12.73t-105.86 12.73Q321.69-349.92 272.31-326q-15.16 8.08-23.73 19.77q-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z" /></svg></div>
            <div className="staff-info">
              <h2>{`${staffInfo.firstname} ${staffInfo.lastname}`}</h2><br />
              <p>Staff Id :- {staffInfo.uid}</p>
            </div>
            <span>Time : {time}</span>
          </div>

          <form className="token-generate" onSubmit={handleSubmit(onSubmit)}>
            <div
              className="course"
              onClick={hideCourseBox}
              style={{ display: `${isCourseBox ? "flex" : "none"}` }}
            >
              <div className="course-input-contain">
                <span className="backToRegister" style={{ position: "absolute", top: "15px", left: "15px", cursor: "pointer" }} onClick={handleBackButton}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M372.31-267.69 160-480l212.31-212.31L400.62-664l-164 164H800v40H236.62l164 164-28.31 28.31Z" /></svg></span>
                <input {...register("course")} type="hidden" />
                <input {...register("semister")} type="hidden" />
                <input {...register("token")} type="hidden" />
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
            <h1>{generatedToken || "Token Show Here"}</h1>
            <button onClick={courseBox} className='input_branch'>
              {selectedCourse && selectedSemester ? `${selectedCourse} - ${selectedSemester}` : "Select Course And Semester"}
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m480-381.54 123.08-123.08H356.92L480-381.54Zm.13 261.54q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41q28.34-65.73 76.92-114.36q48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34q65.73 28.34 114.36 76.92q48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41q-28.34 65.73-76.92 114.36q-48.58 48.63-114.26 76.99Q554.81-120 480.13-120Zm-.13-40q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
            </button>
            <button className='tokenHere' type="submit" disabled={onTimeSub === "No Classes Found"} onClick={generateToken}>Generate Token</button>
            {/* <button onClick={handleSubmitAttendence} className="submit-attendence">Submit Attendance</button> */}
          </form>
        </div>
        <div className="live-attendence-contain">
          <LiveAttendence course={selectedCourse} semester={selectedSemester} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;