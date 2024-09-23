import React, { useEffect, useRef } from 'react'; // Import necessary React hooks
import * as THREE from 'three'; // Import Three.js for 3D rendering
import { Tween, update as TWEENUpdate } from '@tweenjs/tween.js'; // Import Tween.js for animations

const Avatar = () => {
  const containerRef = useRef(null); // Create a ref to attach to the container

  // Handle keydown events for movement
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault(); // Prevent scrolling
      // Add your movement logic here if needed
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current; // Get the container ref
    const scene = new THREE.Scene(); // Create a new Three.js scene
    const aspectRatio = window.innerWidth / window.innerHeight; // Calculate aspect ratio
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000); // Create a camera
    camera.position.z = 500; // Set camera position

    const renderer = new THREE.WebGLRenderer(); // Create a WebGL renderer
    renderer.setSize(window.innerWidth / 1.8, window.innerHeight / 1.9); // Set renderer size
    renderer.setClearColor(0xffffff); // Set background color to white
    container.appendChild(renderer.domElement); // Append renderer to the container

    const notAllowed = []; // Array to store non-movable boundaries
    const marker = new THREE.Object3D(); // Create a marker object for the avatar
    scene.add(marker); // Add marker to the scene

    const cover = new THREE.MeshNormalMaterial(); // Create a material for the avatar
    const body = new THREE.SphereGeometry(100); // Create body geometry
    const avatar = new THREE.Mesh(body, cover); // Create avatar mesh
    marker.add(avatar); // Add avatar to the marker

    // Create hands
    const handGeometry = new THREE.SphereGeometry(50); // Hand geometry
    const rightHand = new THREE.Mesh(handGeometry, cover); // Right hand mesh
    rightHand.position.set(-150, 0, 0); // Position right hand
    avatar.add(rightHand); // Add right hand to avatar

    const leftHand = new THREE.Mesh(handGeometry, cover); // Left hand mesh
    leftHand.position.set(150, 0, 0); // Position left hand
    avatar.add(leftHand); // Add left hand to avatar

    // Create feet
    const footGeometry = new THREE.SphereGeometry(50); // Foot geometry
    const rightFoot = new THREE.Mesh(footGeometry, cover); // Right foot mesh
    rightFoot.position.set(-75, -125, 0); // Position right foot
    avatar.add(rightFoot); // Add right foot to avatar

    const leftFoot = new THREE.Mesh(footGeometry, cover); // Left foot mesh
    leftFoot.position.set(75, -125, 0); // Position left foot
    avatar.add(leftFoot); // Add left foot to avatar

    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(25); // Eye geometry
    const rightEye = new THREE.Mesh(eyeGeometry, cover); // Right eye mesh
    rightEye.position.set(-40, 25, 80); // Position right eye
    avatar.add(rightEye); // Add right eye to avatar

    const leftEye = new THREE.Mesh(eyeGeometry, cover); // Left eye mesh
    leftEye.position.set(40, 25, 80); // Position left eye
    avatar.add(leftEye); // Add left eye to avatar

    marker.add(camera); // Add camera to the marker
  
    // Function to create trees
    function makeTreeAt(x, z) {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 200), // Create tree trunk
        new THREE.MeshBasicMaterial({ color: 0xA0522D }) // Trunk material
      );

      const top = new THREE.Mesh(
        new THREE.SphereGeometry(150), // Create tree top
        new THREE.MeshBasicMaterial({ color: 0x228B22 }) // Top material
      );

      const boundary = new THREE.Mesh(
        new THREE.CircleGeometry(300), // Create boundary for collisions
        new THREE.MeshNormalMaterial()
      );
      boundary.position.y = -100; // Position boundary
      boundary.rotation.x = -Math.PI / 2; // Rotate boundary
      trunk.add(boundary); // Add boundary to trunk
      notAllowed.push(boundary); // Add to notAllowed array

      top.position.y = 175; // Position top of the tree
      trunk.add(top); // Add top to trunk
      trunk.position.set(x, -75, z); // Position trunk in the scene
      scene.add(trunk); // Add trunk to the scene
    }

    // Create multiple trees in the scene
    [
      [500, 0], [-500, 0], [750, -1000], [-750, -1000],
      [1000, 0], [-1000, 0], [1250, -1000], [-1250, -1000],
      [1500, 0], [-1500, 0], [1750, -1000], [-1750, -1000],
      [2000, 0], [-2000, 0], [2250, -1000], [-2250, -1000]
    ].forEach(([x, z]) => makeTreeAt(x, z)); // Generate trees at specified coordinates

    let isMovingRight = false; // Movement flags
    let isMovingLeft = false;
    let isMovingForward = false;
    let isMovingBack = false;
    let isCartwheeling = false;
    let isFlipping = false;

    const clock = new THREE.Clock(true); // Create a clock to track time

    function animate() {
      requestAnimationFrame(animate); // Request the next animation frame
      TWEENUpdate(); // Update Tween animations
      walk(); // Call walking logic
      turn(); // Call turning logic
      acrobatics(); // Call acrobatic logic
      renderer.render(scene, camera); // Render the scene
    }
    animate(); // Start the animation loop

    function walk() {
      if (!isWalking()) return; // Check if walking
      const position = Math.sin(clock.getElapsedTime() * 5) * 50; // Calculate position for walking animation
      rightHand.position.z = position; // Move right hand
      leftHand.position.z = -position; // Move left hand
      rightFoot.position.z = -position; // Move right foot
      leftFoot.position.z = position; // Move left foot
    }

    function turn() {
      let direction = 0; // Initialize direction
      if (isMovingForward) direction = Math.PI; // facing forward
      if (isMovingBack) direction = 0; // facing backward
      if (isMovingRight) direction = Math.PI / 2; // facing right
      if (isMovingLeft) direction = -Math.PI / 2; // facing left

      avatar.rotation.y = direction; // Update avatar rotation
    }

    // Function to spin the avatar
    function spinAvatar(direction) {
      new Tween({ y: avatar.rotation.y }) // Create a tween for smooth rotation
        .to({ y: direction }, 100) // Target direction
        .onUpdate(function () {
          avatar.rotation.y = this.y; // Update rotation on each frame
        })
        .start(); // Start the tween
    }

    function acrobatics() {
      // Apply acrobatic animations
      if (isCartwheeling) {
        avatar.rotation.z += 0.05; // Rotate avatar for cartwheeling
      }
      if (isFlipping) {
        avatar.rotation.x -= 0.05; // Rotate avatar for flipping
      }
    }

    function isWalking() {
      // Check if the avatar is moving in any direction
      return isMovingRight || isMovingLeft || isMovingForward || isMovingBack;
    }

    document.addEventListener('keydown', (event) => {
      const code = event.keyCode; // Get the key code of the pressed key
      if (code === 37) { // Left arrow
        marker.position.x -= 5; // Move left
        isMovingLeft = true; // Set moving flag
        spinAvatar(-Math.PI / 2); // Spin avatar to the left
      }
      if (code === 38) { // Up arrow
        marker.position.z -= 5; // Move forward
        isMovingForward = true; // Set moving flag
      }
      if (code === 39) { // Right arrow
        marker.position.x += 5; // Move right
        isMovingRight = true; // Set moving flag
      }
      if (code === 40) { // Down arrow
        marker.position.z += 5; // Move backward
        isMovingBack = true; // Set moving flag
      }
      if (code === 67) { // 'C' key for cartwheel
        isCartwheeling = true; // Set cartwheeling flag
      }
      if (code === 70) { // 'F' key for flip
        isFlipping = true; // Set flipping flag
      }
    });

    document.addEventListener('keyup', (event) => {
      const code = event.keyCode; // Get the key code of the released key
      if (code === 37) isMovingLeft = false; // Clear moving flag for left
      if (code === 38) isMovingForward = false; // Clear moving flag for forward
      if (code === 39) isMovingRight = false; // Clear moving flag for right
      if (code === 40) isMovingBack = false; // Clear moving flag for backward
      if (code === 67) isCartwheeling = false; // Clear cartwheeling flag
      if (code === 70) isFlipping = false; // Clear flipping flag
    });

    return () => {
      container.removeChild(renderer.domElement); // Clean up renderer on unmount
    };
  }, []); // Run effect only once on mount

  return <div ref={containerRef} style={{ height: '100vh' }} />; // Render container
};

export default Avatar; // Export Avatar component
