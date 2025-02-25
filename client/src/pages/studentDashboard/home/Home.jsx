import React from 'react'

import './home.css'
import Details from './details/Details';
import StuToken from './token/StuToken';
import StaffToken from './token/StaffToken';
function Home() {
  const role = localStorage.getItem("role");
  return (
<<<<<<< HEAD:client/src/components/home/Home.jsx
    <div className='home'>
      <Details/>
      {role === 'student' ? <StuToken/> : <StaffToken/>}
=======
    <div className="home-contain">

      <div className='home'>
        <Details />
        <Token />
      </div>

>>>>>>> main:client/src/pages/studentDashboard/home/Home.jsx
    </div>
  )
}

export default Home
