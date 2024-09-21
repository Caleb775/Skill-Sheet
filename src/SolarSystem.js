import React, { useEffect } from 'react';
import * as THREE from 'three';

const SolarSystem = () => {
    
  useEffect(() => {
      // Set up the Three.js scene
      const scene = new THREE.Scene(); // Create a new scene
      const aspect_ratio = window.innerWidth / window.innerHeight; // Calculate the aspect ratio for cameras
        
      // Create cameras
      const above_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
      above_cam.position.z = 1000; // Position the camera high above
      scene.add(above_cam); // Add the above camera to the scene
        
      const earth_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
      scene.add(earth_cam); // Add the Earth camera
        
      const mars_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
      scene.add(mars_cam); // Add the Mars camera
        
      // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);  
      let camera = above_cam; // Start with the above camera
        
     // Create the Sun using MeshStandardMaterial for better lighting effects
     const sunSurface = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        emissive: 0xFFD700,
        roughness: 0.5,
        metalness: 0.5,
      });
          
  const sunStar = new THREE.SphereGeometry(50, 28, 21);
  const sun = new THREE.Mesh(sunStar, sunSurface);
  scene.add(sun); // Add the Sun to the scene
          
  // Set up sunlight
  const sunlight = new THREE.PointLight(0xffffff, 2, 1000); // Adjust intensity as needed
  sunlight.position.set(0, 0, 0); // Position it at the center where the Sun is
  scene.add(sunlight); // Add the point light to the scene
        
      // Add ambient light (doesn't cast shadows, provides a base light level)
const ambient = new THREE.AmbientLight(0xffffff, 0.5); // Lower intensity for a more realistic effect
scene.add(ambient);
        
// Optional: Create a star field
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff }); // White stars
const starCount = 5000; // Number of stars
const positions = new Float32Array(starCount * 3); // Each star has x, y, z positions
        
for (let i = 0; i < starCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 2000; // Random x position
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // Random y position
  positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // Random z position
}
        
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const stars = new THREE.Points(starGeometry, starMaterial); // Create points from geometry and material
scene.add(stars); // Add stars to the scene
        
// Create Earth
      const earthSurface = new THREE.MeshPhongMaterial({ emissive: 0x1a1a1a, color: 0x0000cd });
      const earthPlanet = new THREE.SphereGeometry(20, 20, 15);
      const earth = new THREE.Mesh(earthPlanet, earthSurface);
      earth.position.set(250, 0, 0); // Position Earth
      scene.add(earth); // Add Earth to the scene
        
      // Create Mars
      const marsSurface = new THREE.MeshPhongMaterial({ emissive: 0x1a1a1a, color: 0xb22222 });
      const marsPlanet = new THREE.SphereGeometry(20, 20, 15);
      const mars = new THREE.Mesh(marsPlanet, marsSurface);
      mars.position.set(500, 0, 0); // Position Mars
      scene.add(mars); // Add Mars to the scene
        
      const clock = new THREE.Clock(); // Create a clock to track time
        
      // Animation function
      function animate() {
        requestAnimationFrame(animate); // Request the next frame
        
        const time = clock.getElapsedTime(); // Get the elapsed time
        const e_angle = time * 0.8; // Calculate Earth's angle
        earth.position.set(250 * Math.cos(e_angle), 250 * Math.sin(e_angle), 0); // Move Earth in orbit
        
        const m_angle = time * 0.3; // Calculate Mars' angle
        mars.position.set(500 * Math.cos(m_angle), 500 * Math.sin(m_angle), 0); // Move Mars in orbit
        
        // Update the Mars camera
        mars_cam.position.set(mars.position.x, mars.position.y, 22);
        mars_cam.lookAt(sun.position); // Point Mars camera at the Sun
        mars_cam.up.set(0, 0, 1); // Set the up direction for Mars camera
        
        // Update the Earth camera
        earth_cam.rotation.set(Math.PI / 2, -Math.atan2(mars.position.x - earth.position.x, mars.position.y - earth.position.y), 0);
        earth_cam.position.set(earth.position.x, earth.position.y, 22); // Position the Earth camera
        
        renderer.render(scene, camera); // Render the scene from the current camera's perspective
      }
        
      animate(); // Start the animation
        
      // Event listener for keydown events to switch cameras
      document.addEventListener("keydown", function (event) {
        if (event.keyCode === 65) { // If 'A' is pressed
          camera = above_cam; // Switch to the above camera
        } else if (event.keyCode === 69) { // If 'E' is pressed
          camera = earth_cam; // Switch to the Earth camera
        } else if (event.keyCode === 80) { // If 'P' is pressed
          camera = mars_cam; // Switch to the Mars camera
        }
      });

      return () => { // Cleanup code when the component unmounts
        renderer.dispose(); // Clean up Three.js resources
    };
}, []);

return <div/>;
};

export default SolarSystem;