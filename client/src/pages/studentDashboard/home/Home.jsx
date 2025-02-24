import React from 'react'

import './home.css'
import Details from './details/Details'
import Token from './token/Token'
function Home() {
  return (
    <div className="home-contain">

      <div className='home'>
        <Details />
        <Token />
      </div>

    </div>
  )
}

export default Home
