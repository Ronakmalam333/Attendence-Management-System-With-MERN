import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import PrivacyPolicy from './components/privacypolicy/PrivacyPolicy';
import Home from './components/home/Home';
import NavbarLayout from './components/nested routing/NavbarLayout';



function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          
          <Route element={<NavbarLayout/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
          </Route>

          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;