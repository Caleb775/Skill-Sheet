import React, { useState } from 'react';
import web from './icons/Web-dev.svg';
import SolarSystem from './SolarSystem';


const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div 
        onClick={handleClick} 
        style={{
          width: isExpanded ? '200px' : '100px',
          height: isExpanded ? '200px' : '100px',
          backgroundColor: 'lightblue',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        {isExpanded ? (
            <SolarSystem />
        ) : (
          <span>Click me!</span>
        )}
      </div>
    </div>
  );
};

export default About;