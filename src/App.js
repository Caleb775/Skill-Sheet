import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import web from './icons/Web-dev.svg';
import api from './icons/Api.svg';
import ricon from './icons/reacti.svg';
import './App.css';
import Projects from './Projects';
import About from "./About";

function App() {
  return (
    
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        
        {/* Main Content */}
        <Routes>
          <Route path="/" element={
            <>
        {/* Hero Section */}
            <header className="hero-section">
              <h1>Welcome to My Portfolio</h1>
              <p>A Full-Stack Developer</p>
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
            <section className="images-section, contact-section">
              <div className="image-container">
                <img src={web} className="animated-image" alt="Web" />
                <img src={ricon} className="animated-image" alt="React" />
                <img src={api} className="animated-image" alt="API" />
              </div>
             {/* Contact Section */}
              <h2>Contact Me</h2>
              <form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
              </form>
            </section>
            </>
          } />


         {/* Projects Page */}
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
</Router>
  );
}

export default App;
