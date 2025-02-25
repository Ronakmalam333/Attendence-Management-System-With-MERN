
import React, { useContext, useEffect, useState } from "react";
import './liveAttendence.css'
import { scheduleContext } from "../../../components/context/Schedule";

function LiveAttendence() {

  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  });

  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);

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

  const time = `${hours}.${String(minutes).padStart(2, "0")}`;



  let onTimeSub = "No Classes Found";

  if (time >= 9.15 && time < 10.15) onTimeSub = sub[0];
  else if (time >= 10.15 && time < 11.15) onTimeSub = sub[1];
  else if (time >= 11.15 && time < 12.15) onTimeSub = sub[2];
  else if (time >= 12.15 && time < 14) onTimeSub = sub[3];
  else if (time >= 14 && time < 15) onTimeSub = sub[4];
  else if (time >= 15 && time < 16) onTimeSub = sub[5];

  return (
    <div className='live-attendence'>
      <div className="heading">
        <h1>Subject : {onTimeSub}</h1>
        <span>Total Present : 0</span>
      </div>

      <div className="live-attendence-box">

        <div className="table-heading">
          <span>Sr No.</span>
          <span>Student Name</span>
          <span>UID</span>
          <span>Status</span>
        </div>

        <div className="table-body">
          <div className="student-entry">
            <span>1</span>
            <span>ronak malam</span>
            <span>24BTCSE25</span>
            <span>A</span>
          </div>

          <button className="submit-attendence">Submit Attendence</button>

        </div>

      </div>
    </div>
  )
}

export default LiveAttendence
