import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<><Home /> <Navbar /></>} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign' element={<Register />} />
      </Routes>
    </Router>

  )
}

export default App
