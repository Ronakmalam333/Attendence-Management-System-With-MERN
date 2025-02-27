import React, { useContext } from "react";
import { scheduleContext } from '../../../components/context/Schedule';
import "./classes.css";

function Classes() {
  const { mon, tue, wed, thu, fri } = useContext(scheduleContext);

  return (
    <div className='classes-contain'>
      <h1>Timetable</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {mon.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.start} - {classItem.end}</td>
              <td>{classItem.sub} ({classItem.faculty})</td>
              <td>{tue[index] ? `${tue[index].sub} (${tue[index].faculty})` : ''}</td>
              <td>{wed[index] ? `${wed[index].sub} (${wed[index].faculty})` : ''}</td>
              <td>{thu[index] ? `${thu[index].sub} (${thu[index].faculty})` : ''}</td>
              <td>{fri[index] ? `${fri[index].sub} (${fri[index].faculty})` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Classes;