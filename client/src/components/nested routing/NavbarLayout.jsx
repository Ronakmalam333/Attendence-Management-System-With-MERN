
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

function NavbarLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default NavbarLayout
