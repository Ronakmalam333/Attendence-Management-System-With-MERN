import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import PrivacyPolicy from './components/privacypolicy/PrivacyPolicy';
import NavbarLayout from './components/nested routing/NavbarLayout';
import AboutUs from './components/about us/AboutUs';
import Attendence from './components/attendence/Attendence';
import Feedback from './components/feedback/Feedback';
import { AuthProvider } from './components/context/AuthContext';
import StudentDashboard from './pages/studentDashboard/StudentDashboard';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            {/* Public routes (no navbar) */}
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Routes with NavbarLayout */}
            <Route element={<NavbarLayout />}>
              {/* Role-based routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Common routes */}
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/attendence" element={<Attendence />} />
              <Route path="/feedback" element={<Feedback />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;