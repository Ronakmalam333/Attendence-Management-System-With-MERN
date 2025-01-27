
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Register from './components/register/Register'
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './components/login/Login';

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
