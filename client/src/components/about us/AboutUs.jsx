
import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>About CampusTrack</h1>
        <p className="tagline">Revolutionizing College Attendance Management</p>
      </header>

      <section className="content-section mission-section">
        <div className="section-header">
          <h2>Our Mission</h2>
          <div className="decorative-line"></div>
        </div>
        <p className="mission-statement">
          At CampusTrack, we're committed to transforming traditional attendance management 
          through innovative technology. Our goal is to streamline academic processes, 
          enhance student engagement, and provide real-time insights for educational institutions.
        </p>
      </section>

      <section className="content-section features-section">
        <div className="section-header">
          <h2>Key Features</h2>
          <div className="decorative-line"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Real-time Tracking</h3>
            <p>Instant attendance recording with geolocation verification</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive reports and data visualization tools</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Military-grade encryption and privacy protection</p>
          </div>
        </div>
      </section>

      <section className="content-section team-section">
        <div className="section-header">
          <h2>Our Team</h2>
          <div className="decorative-line"></div>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo" style={{backgroundImage: 'url(https://via.placeholder.com/150)'}}></div>
            <h3>Anmol Sinha</h3>
            <p>CO-Founder</p>
          </div>
          <div className="team-card">
            <div className="team-photo" style={{backgroundImage: 'url(https://via.placeholder.com/150)'}}></div>
            <h3>Jugendra Kashyap</h3>
            <p>CO-Founder</p>
          </div>
          <div className="team-card">
            <div className="team-photo" style={{backgroundImage: 'url(https://via.placeholder.com/150)'}}></div>
            <h3>Ronak Malak</h3>
            <p>CO-Founder</p>
          </div>
        </div>
      </section>

      <section className="content-section contact-section">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <div className="decorative-line"></div>
        </div>
        <div className="contact-info">
          <p>📧 anmolsinha4321@gmail.com</p>
          <p>📞 +918733942557</p>
          <p>📍 boyshostel, </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;