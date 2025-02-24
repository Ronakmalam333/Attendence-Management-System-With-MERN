import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import PrivacyPolicy from './components/privacypolicy/PrivacyPolicy';
import NavbarLayout from './components/nested routing/NavbarLayout';
import AboutUs from './components/about us/AboutUs';
import AllAttendence from './pages/adminDashboard/attendence/AllAttendence';
import Feedback from './components/feedback/Feedback';
import { AuthProvider } from './components/context/AuthContext';
import StudentDashboard from './pages/studentDashboard/StudentDashboard';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StudentAttendence from './pages/studentDashboard/attendence/StudentAttendence';
import Classes from './pages/studentDashboard/classes/Classes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <NavbarLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentDashboard />} />
              <Route path='attendence' element={<StudentAttendence/>}/>
              <Route path='students' element={<Classes/>}/>
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>

            <Route
              path="/staff"
              element={
                <ProtectedRoute role="staff">
                  <NavbarLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="attendence" element={<AllAttendence />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;