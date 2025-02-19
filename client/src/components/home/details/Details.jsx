import React, { useContext } from 'react'

import './details.css'
import { scheduleContext } from '../../context/Schedule'
function Details() {
  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);
  let day = new Date().getDay();
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
  console.log(mon);
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
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {schedule.map((value) => (
              <div className='sub_name'>
                <div style={{ display: 'flex', width: '100%', height: '40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <div style={{ height: '50%', backgroundColor: 'yellow' }}>{value.start}</div>
                    <div style={{ height: '50%', backgroundColor: 'skyblue' }}>{value.end}</div>
                  </div>
                  <div style={{ height: '100%', width: '60%', backgroundColor: 'pink' }}>{value.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className='attendance'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Details