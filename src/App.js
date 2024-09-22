import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import web from './icons/Web-dev.svg';
import api from './icons/Api.svg';
import ricon from './icons/reacti.svg';
import './App.css';
import Projects from './Projects';
import About from "./About";

function App() {
  const [isContactInFront, setIsContactInFront] = useState(false);

  const toggleContact = () => {
    setIsContactInFront(prevState => !prevState);
  };

  return (
    <Router>
      <div className="App">
        {/* Toggle Button */}
        <button onClick={toggleContact} className="toggle-btn">
          {isContactInFront ? "Back to Main" : "Contact Me"}
        </button>
        
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Me</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        
        {/* Main Content */}
        <div className={isContactInFront ? "background-content" : "foreground-content"}>
          <Routes>
            <Route path="/" element={
              <>
              {/* Hero Section */}
              <header className="hero-section">
                <h1>Hi im Caleb</h1>
                <p>Im a Full-Stack Developer</p>
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
            } />

            {/* Projects Page */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        {/* Contact Section */}
        <div className={`contact-container ${isContactInFront ? "in-front" : ""}`}>
          <section className="contact-section">
            <h2>Contact Me</h2>
            <form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
