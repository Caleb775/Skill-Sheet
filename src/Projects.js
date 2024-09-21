import React, { useEffect, useRef, useState, useMemo } from 'react'; 
import ReactDOM from 'react-dom/client'; 

const Projects = () => {
  const [openProject, setOpenProject] = useState(null); 
  const threeJsRefs = useRef({}); 

  // Use useMemo to memoize the projects array
  const projects = useMemo(() => [
    { id: 1, title: '3D Solar System Simulation', file: () => import('./SolarSystem') },
    { id: 2, title: '3D Avatar', file: () => import('./Avatar') },
  ], []); // Empty dependency array means this will only be created once

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
  }, [openProject, projects]); // projects is now memoized

  return (
    <div className="projects-section">
      <h1>My Projects</h1>
      {projects.map(project => (
        <div key={project.id} className="project-box" onClick={() => toggleProject(project.id)}>
          <h2>{project.title}</h2>
          {openProject === project.id && (
            <div className="project-details">
              <div 
                ref={ref => threeJsRefs.current[project.id] = ref} 
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
