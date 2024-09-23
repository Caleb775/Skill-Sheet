import React, { useEffect, useRef, useState, useMemo } from 'react'; // Import necessary hooks
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering components

const Projects = () => {
  const [openProject, setOpenProject] = useState(null); // State to manage which project is open
  const threeJsRefs = useRef({}); // Ref to store references to Three.js project containers

  // Define project details
  const projects = useMemo(() => [
    { id: 1, title: '3D Solar System Simulation', file: () => import('./SolarSystem') }, // Project 1
    { id: 2, title: '3D Avatar', file: () => import('./Avatar') }, // Project 2
    { id: 3, title: 'Weather Cats', url: 'https://melissarubiio.github.io/Weather-Cats/' } // Project 3
  ], []);

  // Handle opening/closing of projects
  const toggleProject = async (projectId) => {
    setOpenProject(prev => prev === projectId ? null : projectId); // Toggle project visibility
  };

  // Render Three.js projects
  useEffect(() => {
    if (!openProject) return; // Exit if no project is open

    const project = projects.find(p => p.id === openProject); // Find the current project
    if (project?.file) {
      project.file().then(module => {
        const ProjectComponent = module.default; // Get the project component
        const projectRef = threeJsRefs.current[openProject]; // Get the container for the project

        if (projectRef) {
          projectRef.innerHTML = ''; // Clear previous content
          const projectInstance = React.createElement(ProjectComponent); // Create a new project instance
          const root = ReactDOM.createRoot(projectRef); // Create a root for rendering
          root.render(projectInstance); // Render the project component
        }
      });
    }
  }, [openProject, projects]);

  return (
    <div className="projects-section">
      <h1>My Projects</h1> {/* Section heading */}
      {projects.map(project => (
        <div
          key={project.id} // Unique key for each project
          className={`project-box ${openProject === project.id ? 'open' : ''}`} // Add open class if project is active
          onClick={() => toggleProject(project.id)} // Toggle project on click
        >
          <h2>{project.title}</h2> {/* Project title */}
          {openProject === project.id && (
            <div className="project-details"> {/* Project details */}
              {project.id === 1 && (
                <p>
                  An interactive 3D solar system simulation built with Three.js. Users can switch
                  between camera views to explore the planets orbiting the Sun.
                </p>
              )}
              {project.id === 2 && (
                <p>
                  A customizable 3D avatar with various acrobatic movements and collision detection. 
                  Controlled with the keyboard to walk, turn, flip, and cartwheel.
                </p>
              )}
              {project.id === 3 && (
                <>
                  <p>
                    Weather Cats combines local weather with famous quotes and cat images to bring joy
                    to users. View the <a href="https://github.com/melissarubiio/Weather-Cats?tab=readme-ov-file" className="better-a">GitHub Repository</a>.
                  </p>
                  <iframe
                    src={project.url} // URL for Weather Cats project
                    title="Weather Cats"
                    style={{ width: '100%', height: '500px', border: 'none' }} // Styling for iframe
                    allowFullScreen // Allow full screen mode
                  />
                </>
              )}
              {project.id !== 3 && <div ref={ref => (threeJsRefs.current[project.id] = ref)} />} {/* Reference for Three.js projects */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects; // Export the Projects component
