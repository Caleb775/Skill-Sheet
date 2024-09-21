import React from 'react';
import web from './icons/Web-dev.svg';
import api from './icons/Api.svg';
import ricon from './icons/reacti.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <a href="#top">Home</a>
        <a href="#top">About</a>
        <a href="#top">Contact</a>
        <a href="#top">Projects</a>
      </nav>

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
      <section className="images-section">
        <div className="image-container">
          <img src={web} className="animated-image" alt="Web" />
          <img src={ricon} className="animated-image" alt="React" />
          <img src={api} className="animated-image" alt="API" />
        </div>
      </section>

       {/* Contact Section */}
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
  );
}

export default App;
