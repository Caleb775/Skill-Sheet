import React, { useEffect, useRef, useState, useMemo } from 'react'; 
import ReactDOM from 'react-dom/client'; 

const Projects = () => {
  const [openProject, setOpenProject] = useState(null); 
  const threeJsRefs = useRef({}); 

  const projects = useMemo(() => [
    { id: 1, title: '3D Solar System Simulation', file: () => import('./SolarSystem') },
    { id: 2, title: '3D Avatar', file: () => import('./Avatar') },
  ], []); 

  const toggleProject = async (projectId) => {
    if (openProject === projectId) {
      setOpenProject(null);
    } else {
      setOpenProject(projectId);
    }
  };

  useEffect(() => {
    if (openProject) {
      const project = projects.find(p => p.id === openProject);
      project.file().then((module) => {
        const ProjectComponent = module.default;
        const projectRef = threeJsRefs.current[openProject];

        if (projectRef) {
          projectRef.innerHTML = ''; // Clear previous content
          const projectInstance = React.createElement(ProjectComponent);
          const root = ReactDOM.createRoot(projectRef); // Pass the DOM element
          root.render(projectInstance); // Render the React element
        }
      });
    }
  }, [openProject, projects]); 

  return (
    <div className="projects-section">
      <h1>My Projects</h1>
      {projects.map(project => (
        <div key={project.id} className="project-box" onClick={() => toggleProject(project.id)}>
          <h2>{project.title}</h2>
          {openProject === project.id && (
            <div className="project-details">
              {project.id === 1 && ( // Render description only for Solar System project
                <p>
                  My 3D solar system project is an interactive simulation that shows planets orbiting 
                  the Sun. Made with Three.js, it features a realistic starry background and lighting effects. 
                  The Sun glows brightly at the center, while Earth and Mars move smoothly along their paths. 
                  Users can switch between different camera views—overhead (press A), Earth (Press E), and Mars (Press P) to explore the solar system from various angles.
                </p>
              )}
              {project.id === 2 && ( // Render description only for Solar System project
                <p>
                  My avatar project has a customizable 3D character that can perform movements like 
                  walking, turning, cartwheeling, and flipping, all controlled by the keyboard. I Built it with Three.js, 
                  the character is made up of geometric shapes for its body and face. It includes collision detection to prevent passing through obstacles, 
                  allowing for realistic interactions. This Project was so cool to make. You use the arrow keys to move and press 
                  D to cartwheel and F to flip.</p>
              )}
              <div ref={ref => threeJsRefs.current[project.id] = ref} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
