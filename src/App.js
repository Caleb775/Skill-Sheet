import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import web from './icons/Web-dev.svg';
import api from './icons/Api.svg';
import ricon from './icons/reacti.svg';
import './App.css';
import Projects from './Projects';
import About from './About';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isContactInFront, setIsContactInFront] = useState(false);
  const location = useLocation(); // Track current route

  const toggleContact = () => {
    setIsContactInFront(prevState => !prevState);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About Me</Link>
        <Link to="/projects">Projects</Link>
        {location.pathname === '/' && ( // Toggle button only appears on Home page
          <button onClick={toggleContact} className="toggle-btn button-style">
            {isContactInFront ? 'Back to Main' : 'Contact Me'}
          </button>
        )}
      </nav>

      {/* Main Content */}
      <MainContent isContactInFront={isContactInFront} />

      {/* Contact Section */}
      <ContactSection isContactInFront={isContactInFront} />
    </div>
  );
}

// MainContent handles the switching of content based on isContactInFront state
const MainContent = ({ isContactInFront }) => {
  return (
    <div className={isContactInFront ? 'background-content' : 'foreground-content'}>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

// Home page content
const HomeContent = () => (
  <>
    {/* Hero Section */}
    <header className="hero-section">
      <h1>Hi, I'm Caleb</h1>
      <p>I'm a Front-End Developer</p>
    </header>

    {/* Skills Section */}
    <section className="skills-section">
      <div className="skills-content">
        <h2>Technologies I'm Proficient In</h2>
        <div className="skills-list">
          <span>React</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>Python</span>
          <span>Node.js</span>
          <span>Git</span>
          <span>SQL</span>
          <span>Bootstrap</span>
          <span>APIs</span>
        </div>
      </div>
    </section>

    {/* Image Section with Animation */}
    <section className="images-section">
      <div className="image-container">
        <img src={web} className="animated-image" alt="Web" />
        <img src={ricon} className="animated-image" alt="React" />
        <img src={api} className="animated-image" alt="API" />
      </div>
    </section>
  </>
);

// Contact section
const ContactSection = ({ isContactInFront }) => {
  const location = useLocation(); // Track current route

  // Only display the contact section on the Home page
  if (location.pathname !== '/') {
    return null; // Hide on About and Projects pages
  }

  return (
    <div className={`contact-container ${isContactInFront ? 'in-front' : ''}`}>
      <section className="contact-section">
        <h2>Contact Me</h2>
        <form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit" className="button-style">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default App;
