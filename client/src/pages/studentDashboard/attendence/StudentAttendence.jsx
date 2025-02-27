
import React, { useContext } from 'react'
import './studentattendence.css'
import { scheduleContext } from '../../../components/context/Schedule'

function StudentAttendence() {
  const { mon, tue, wed, thu, fri } = useContext(scheduleContext);
  
  const allSubjects = [...mon, ...tue, ...wed, ...thu, ...fri]
    .filter(subject => subject.sub && subject.sub !== 'Library' && subject.sub !== 'Sports' && subject.sub !== 'Free Class')
    .map(subject => ({
      date: '2023-10-01',
      status: 'Present',
      course: subject.sub
    }));


  return (
    <div className='student-attendence'>
      <h1>Attendance History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allSubjects.map((record, index) => (

            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.course}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default StudentAttendence
