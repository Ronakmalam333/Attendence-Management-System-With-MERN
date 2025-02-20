import React from 'react'

import './token.css'
function Token() {
  return (
    <div className='token_contain'>
      <form className='token_box'>
        <h1 className='sub_name'>Subject Name</h1>
        <input className='token_input' type="text" placeholder='Enter Subject Token' />
        <button className='submit_btn'>Submit</button>
      </form>
    </div>
  )
}

export default Token