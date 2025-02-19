import React, { useContext } from 'react'

import './details.css'
import { scheduleContext } from '../../context/Schedule'
function Details() {
  const schedule = useContext(scheduleContext);
  console.log(schedule);
  return (
    <div>
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
            {schedule.map((value, index) => (
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

          <div className='attendance'></div>
        </div>
      </div>
    </div>
  )
}

export default Details