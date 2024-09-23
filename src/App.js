import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'; // Import necessary modules for routing
import web from './icons/Web-dev.svg'; // Import icon for web development
import api from './icons/Api.svg'; // Import API icon
import ricon from './icons/reacti.svg'; // Import React icon
import './App.css'; // Import CSS styles
import Projects from './Projects'; // Import Projects component
import About from './About'; // Import About component

function App() {
  return (
    <Router> {/* Wrap the app in Router to enable routing */}
      <AppContent /> {/* Render main content */}
    </Router>
  );
}

function AppContent() {
  const [isContactInFront, setIsContactInFront] = useState(false); // State to manage contact section visibility
  const location = useLocation(); // Track current route

  const toggleContact = () => {
    setIsContactInFront(prevState => !prevState); // Toggle contact section visibility
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Home</Link> {/* Link to Home page */}
        <Link to="/about">About Me</Link> {/* Link to About page */}
        <Link to="/projects">Projects</Link> {/* Link to Projects page */}
        {location.pathname === '/' && ( // Toggle button only appears on Home page
          <button onClick={toggleContact} className="toggle-btn button-style">
            {isContactInFront ? 'Back to Main' : 'Contact Me'} {/* Button text based on state */}
          </button>
        )}
      </nav>

      {/* Main Content */}
      <MainContent isContactInFront={isContactInFront} /> {/* Render main content */}

      {/* Contact Section */}
      <ContactSection isContactInFront={isContactInFront} /> {/* Render contact section */}
    </div>
  );
}

// MainContent handles the switching of content based on isContactInFront state
const MainContent = ({ isContactInFront }) => {
  return (
    <div className={isContactInFront ? 'background-content' : 'foreground-content'}>
      <Routes>
        <Route path="/" element={<HomeContent />} /> {/* Route for Home page */}
        <Route path="/projects" element={<Projects />} /> {/* Route for Projects page */}
        <Route path="/about" element={<About />} /> {/* Route for About page */}
      </Routes>
    </div>
  );
};

// Home page content
const HomeContent = () => (
  <>
    {/* Hero Section */}
    <header className="hero-section">
      <h1>Hi, I'm Caleb</h1> {/* Main heading */}
      <p>I'm a Front-End Developer</p> {/* Subheading */}
    </header>

    {/* Skills Section */}
    <section className="skills-section">
      <div className="skills-content">
        <h2>Technologies I'm Proficient In</h2> {/* Section heading */}
        <div className="skills-list"> {/* List of skills */}
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
        <img src={web} className="animated-image" alt="Web" /> {/* Web icon */}
        <img src={ricon} className="animated-image" alt="React" /> {/* React icon */}
        <img src={api} className="animated-image" alt="API" /> {/* API icon */}
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
        <h2>Contact Me</h2> {/* Section heading */}
        <form action="https://formsubmit.co/41703e550ecc1a626c2615595e5af432" method="POST">
          <input type="text" name="name" placeholder="Your Name" required /> {/* Name input */}
          <input type="email" name="email" placeholder="Your Email" required /> {/* Email input */}
          <textarea name="message" placeholder="Your Message" required></textarea> {/* Message input */}
          <button type="submit" className="button-style">Send Message</button> {/* Submit button */}
        </form>
      </section>
    </div>
  );
};

export default App; // Export the main App component
