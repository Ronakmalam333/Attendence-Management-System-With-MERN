import React, { useContext, useEffect, useState } from "react";
import './liveAttendence.css';
import { scheduleContext } from "../../../components/context/Schedule";
import { AuthContext } from '../../../components/context/AuthContext';

function LiveAttendence({ course, semester }) {
  const [date, setDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const { token } = useContext(AuthContext);
  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);

  // Fetch students based on course and semester
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const url = new URL('http://localhost:5000/students');
        if (course && semester) {
          url.searchParams.append('course', course);
          url.searchParams.append('semester', semester);
        }
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          console.error('Failed to fetch students:', data.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (token) {
      fetchStudents();
    }
  }, [token, course, semester]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const time = `${hours}.${minutes}`;

  let onTimeSub = "No Classes Found";
  if (time >= 9.15 && time < 10.15) onTimeSub = sub[0];
  else if (time >= 10.15 && time < 11.15) onTimeSub = sub[1];
  else if (time >= 11.15 && time < 12.15) onTimeSub = sub[2];
  else if (time >= 13 && time < 14) onTimeSub = sub[3];
  else if (time >= 14 && time < 15) onTimeSub = sub[4];
  else if (time >= 15 && time <= 16) onTimeSub = sub[5];

  const totalPresent = students.filter(student => student.status === 'P').length;

  return (
    <div className='live-attendence'>
      <div className="heading">
        <h1>Subject: {onTimeSub}</h1>
        <span>Total Present: {totalPresent}</span>
      </div>
      <div className="live-attendence-box">
        <div className="table-heading">
          <span>Sr No.</span>
          <span>Student Name</span>
          <span>UID</span>
          <span>Status</span>
        </div>
        <div className="table-body">
          {students.map((student, index) => (
            <div key={student.id} className="student-entry">
              <span>{index + 1}</span>
              <span>{`${student.firstname} ${student.lastname}`}</span>
              <span>{student.uid}</span>
              <span style={{background: `${student.status == 'P'?"rgba(53, 225, 0, 0.673)":"rgba(255, 11, 11, 0.836)"}`}}>{student.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveAttendence;