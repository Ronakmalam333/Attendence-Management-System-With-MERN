import React, { useContext } from 'react'

import './details.css'
import { scheduleContext } from '../../context/Schedule'
function Details() {
  const schedule = useContext(scheduleContext);
  console.log(schedule[0].FERAJ);
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
            
        </div>
    </div>
  )
}

export default Details