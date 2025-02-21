import React, { useContext } from 'react'

import './details.css'
import { scheduleContext } from '../../context/Schedule'
import { tokenContext } from '../../context/Token'
function Details() {
  const { mon, tue, wed, thu, fri, leave } = useContext(scheduleContext);
  const { token, setToken } = useContext(tokenContext);
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
        <div className='current-schedule'>
          <div className='subjects-contain'>
            {schedule.map((value) => (
              <div className='today-sub'>
                <div className='today-time'>
                  <div>{value.start}</div>
                  <div>{value.end}</div>
                </div>
                <div className='sub-name'>{value.sub}</div>
              </div>
            ))}
          </div>

          <div className='attendance'>
            {token == 0 ?
              <div>
                <h1>subject name</h1>
                <input type="text" placeholder='Enter Subject Token' />
                <button>Submit</button>
              </div>
              :
              <div>
                <h1>subject name</h1>
                <div>0000</div>
                <button>Generate Token</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details