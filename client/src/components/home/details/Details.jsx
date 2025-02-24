import React, { useContext, useEffect, useState } from 'react'

import './details.css'
import { scheduleContext } from '../../../context/Schedule'
function Details() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let dateInterval = setInterval(() => {
      setDate(new Date())
    },1000);

    return () => clearInterval(dateInterval)
  })
  
  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);


  let day = date.getDay();
  
  let schedule;
  switch (day) {
    case 1:
      schedule = mon;
      break;
    case 2:
      schedule = tue;
      break;
    case 3:
      schedule = wed;
      break;
    case 4:
      schedule = thu;
      break;
    case 5:
      schedule = fri;
      break;
    default:
      schedule = leave;
      break;
  }
  
  let scheduleLength = [];

  for(let i=1; i<=schedule.length; i++){
    scheduleLength.push(i);
  }
  
  
  return (
    <div className='schedule-contain'>
      <div className='user_info'>
        <div id='profile_img'></div>
        <div id='user_details'>
          <h2>User Name</h2>
          <p>UID: 24BTCSE025</p>
          <p>Phone: 5487585966669</p>
        </div>
      </div>
      <div className="schedule">
        <h2>{new Date().toDateString()}</h2>
        <div className='current-schedule'>
          <div className='subjects-contain'>
            {schedule.map((value, index) => (
              <div key={index} className='today-sub'>
                <div className='today-time'>
                  <div>{value.start}</div>
                  <div>{value.end}</div>
                </div>
                <div className='sub-name'>{value.sub}</div>
              </div>
            ))}
          </div>

          <div className='attendance'>
            {scheduleLength.map((value, index, arr) => (
              <div key={index} style={{height: `calc(100%/${arr.length})`}}>pending</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details