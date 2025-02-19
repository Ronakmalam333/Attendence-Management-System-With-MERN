import React from 'react'

import './home.css'
import Details from './details/Details'
import Token from './token/Token'
function Home() {
  return (
    <div className='home'>
      <Details/>
      <Token/>
    </div>
  )
}

export default Home
