import React from 'react'

import './home.css'
import Details from './details/Details';
import StuToken from './token/StuToken';
import StaffToken from './token/StaffToken';
function Home() {
  const role = localStorage.getItem("role");
  return (
    <div className='home'>
      <Details/>
      {role === 'student' ? <StuToken/> : <StaffToken/>}
    </div>
  )
}

export default Home
