import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

const Projects = () => {
  const [openProject, setOpenProject] = useState(null);
  const threeJsRefs = useRef({}); // Refs to store references to the Three.js containers

  // Define project details
  const projects = useMemo(() => [
    { id: 1, title: '3D Solar System Simulation', file: () => import('./SolarSystem') },
    { id: 2, title: '3D Avatar', file: () => import('./Avatar') },
    { id: 3, title: 'Weather Cats', url: 'https://melissarubiio.github.io/Weather-Cats/' } // Using URL for Weather Cats
  ], []);

  // Handle opening/closing of projects
  const toggleProject = async (projectId) => {
    if (openProject === projectId) {
      setOpenProject(null); // Close if already opened
    } else {
      setOpenProject(projectId); // Open the new project
    }
  };

  // Effect to load and render Three.js projects dynamically
  useEffect(() => {
    if (openProject) {
      const project = projects.find(p => p.id === openProject);
      if (project.file) {
        project.file().then((module) => {
          const ProjectComponent = module.default;
          const projectRef = threeJsRefs.current[openProject]; // Get reference for current project

          if (projectRef) {
            projectRef.innerHTML = ''; // Clear previous content
            const projectInstance = React.createElement(ProjectComponent); // Create React element from imported module
            const root = ReactDOM.createRoot(projectRef); // Initialize a new root
            root.render(projectInstance); // Render the Three.js component
          }
        });
      }
    }
  }, [openProject, projects]);

  return (
    <div className="projects-section">
      <h1>My Projects</h1>
      {projects.map(project => (
        <div 
          key={project.id} 
          className={`project-box ${openProject === project.id ? 'open' : ''}`} 
          onClick={() => toggleProject(project.id)}
        >
          <h2>{project.title}</h2>
          {openProject === project.id && (
            <div className="project-details">
              {project.id === 1 && (
                <p>
                  My 3D solar system project is an interactive simulation that shows planets orbiting
                  the Sun. Made with Three.js, it features a realistic starry background and lighting effects.
                  The Sun glows brightly at the center, while Earth and Mars move smoothly along their paths.
                  Users can switch between different camera views—overhead (press A), Earth (Press E), and Mars (Press P) to explore the solar system from various angles.
                </p>
              )}
              {project.id === 2 && (
                <p>
                  My avatar project has a customizable 3D character that can perform movements like
                  walking, turning, cartwheeling, and flipping, all controlled by the keyboard. I built it with Three.js,
                  the character is made up of geometric shapes for its body and face. It includes collision detection to prevent passing through obstacles,
                  allowing for realistic interactions. You use the arrow keys to move and press D to cartwheel and F to flip.
                </p>
              )}
              {project.id === 3 && (
                <p>
                  Everyone needs a little pick-me-up from time to time and that is something that cats on the internet can definitely deliver.
                  We combined that with the local weather and famous quotes to help people leave their house a little bit happier.
                  Weather-Cats is an easy-to-use, straightforward application that delivers data to the user in a format that they can view simply whether
                  they are on a desktop or using their smartphone.
                  <a href="https://github.com/melissarubiio/Weather-Cats?tab=readme-ov-file" className="better-a"> Github Repository</a>
                </p>
              )}
              {project.id === 3 ? (
                <iframe 
                  src={project.url} 
                  title="Weather Cats" 
                  style={{ width: '100%', height: '500px', border: 'none' }} 
                  allowFullScreen 
                />
              ) : (
                <div ref={ref => threeJsRefs.current[project.id] = ref} />
              )}
        </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
