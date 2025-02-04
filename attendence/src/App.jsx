import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register';
import './App.css'

function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<><Navbar/> <Home/> </>} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
