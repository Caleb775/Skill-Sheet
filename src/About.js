import React from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaNodeJs } from 'react-icons/fa'; // Import skill icons

const About = () => {
  return (
    <div className="about-container">
      {/* Specialize Section */}
      <section className="specialize">
        <h2>Specialize</h2>
        <p>I specialize in using React. I have been using it since 2022. I can quickly create an entire front-end UI/UX with React. I am proficient in other technologies, but I primarily focus on front-end development
        </p>
        <div className="skills-icons">
          <div className="icon react-icon"><FaReact /></div>
          <div className="icon html-icon"><FaHtml5 /></div>
          <div className="icon css-icon"><FaCss3Alt /></div>
          <div className="icon js-icon"><FaJsSquare /></div>
          <div className="icon python-icon"><FaPython /></div>
          <div className="icon node-icon"><FaNodeJs /></div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="about-me">
        <h2>About Me</h2>
        <p>
          I started my programming journey back in 2014. In my junior year, I earned my
          work readiness certification. I didn't get the opportunity to use it, and it became
          redundant. In 2022, I attended the University Of Arizona for full stack web-development. After I completed
          the course, I continued programming entirely on my own and now specialize in React.
          My long-term goal is to become a full stack web developer.
        </p>
      </section>
    </div>
  );
};

export default About;
