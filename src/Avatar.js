import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Tween, update as TWEENUpdate } from '@tweenjs/tween.js';

const Avatar = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // Set background to white
    containerRef.current.appendChild(renderer.domElement);

    const notAllowed = [];
    const marker = new THREE.Object3D();
    scene.add(marker);

    const cover = new THREE.MeshNormalMaterial();
    const body = new THREE.SphereGeometry(100);
    const avatar = new THREE.Mesh(body, cover);
    marker.add(avatar);

    const hand = new THREE.SphereGeometry(50);
    const rightHand = new THREE.Mesh(hand, cover);
    rightHand.position.set(-150, 0, 0);
    avatar.add(rightHand);

    const leftHand = new THREE.Mesh(hand, cover);
    leftHand.position.set(150, 0, 0);
    avatar.add(leftHand);

    const foot = new THREE.SphereGeometry(50);
    const rightFoot = new THREE.Mesh(foot, cover);
    rightFoot.position.set(-75, -125, 0);
    avatar.add(rightFoot);

    const leftFoot = new THREE.Mesh(foot, cover);
    leftFoot.position.set(75, -125, 0);
    avatar.add(leftFoot);

    const eyes = new THREE.SphereGeometry(25);
    const rightEye = new THREE.Mesh(eyes, cover);
    rightEye.position.set(-40, 25, 80);
    avatar.add(rightEye);

    const leftEye = new THREE.Mesh(eyes, cover);
    leftEye.position.set(40, 25, 80);
    avatar.add(leftEye);

    marker.add(camera);
  
    // ... rest of your code remains the same  
    function makeTreeAt(x, z) {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 200),
        new THREE.MeshBasicMaterial({ color: 0xA0522D })
      );

      const top = new THREE.Mesh(
        new THREE.SphereGeometry(150),
        new THREE.MeshBasicMaterial({ color: 0x228B22 })
      );

      const boundary = new THREE.Mesh(
        new THREE.CircleGeometry(300),
        new THREE.MeshNormalMaterial()
      );
      boundary.position.y = -100;
      boundary.rotation.x = -Math.PI / 2;
      trunk.add(boundary);
      notAllowed.push(boundary);

      top.position.y = 175;
      trunk.add(top);
      trunk.position.set(x, -75, z);
      scene.add(trunk);
    }

    // Create trees
    [
      [500, 0], [-500, 0], [750, -1000], [-750, -1000],
      [1000, 0], [-1000, 0], [1250, -1000], [-1250, -1000],
      [1500, 0], [-1500, 0], [1750, -1000], [-1750, -1000],
      [2000, 0], [-2000, 0], [2250, -1000], [-2250, -1000]
    ].forEach(([x, z]) => makeTreeAt(x, z));


    let isMovingRight = false;
    let isMovingLeft = false;
    let isMovingForward = false;
    let isMovingBack = false;
    let isCartwheeling = false;
    let isFlipping = false;

    const clock = new THREE.Clock(true);

    function animate() {
      requestAnimationFrame(animate);
      TWEENUpdate();
      walk();
      turn();
      acrobatics();
      renderer.render(scene, camera);
    }
    animate();

    function walk() {
      if (!isWalking()) return;
      const position = Math.sin(clock.getElapsedTime() * 5) * 50;
      rightHand.position.z = position;
      leftHand.position.z = -position;
      rightFoot.position.z = -position;
      leftFoot.position.z = position;
    }

    function turn() {
      let direction = 0;
      if (isMovingForward) direction = Math.PI; // facing forward
      if (isMovingBack) direction = 0; // facing backward
      if (isMovingRight) direction = Math.PI / 2; // facing right
      if (isMovingLeft) direction = -Math.PI / 2; // facing left

      avatar.rotation.y = direction; // Update rotation directly
    }

    function spinAvatar(direction) {
      new Tween({ y: avatar.rotation.y })
        .to({ y: direction }, 100)
        .onUpdate(function () {
          avatar.rotation.y = this.y;
        })
        .start();
    }

    function acrobatics() {
      if (isCartwheeling) {
        avatar.rotation.z += 0.05;
      }
      if (isFlipping) {
        avatar.rotation.x -= 0.05;
      }
    }

    animate();

    function isWalking() {
      return isMovingRight || isMovingLeft || isMovingForward || isMovingBack;
    }

    document.addEventListener('keydown', function (event) {
      const code = event.keyCode;
      if (code === 37) {
        marker.position.x -= 5; // left
        isMovingLeft = true;
      }
      if (code === 38) {
        marker.position.z -= 5; // up
        isMovingForward = true;
      }
      if (code === 39) {
        marker.position.x += 5; // right
        isMovingRight = true;
      }
      if (code === 40) {
        marker.position.z += 5; // down
        isMovingBack = true;
      }
      if (code === 68) isCartwheeling = !isCartwheeling; // c
      if (code === 70) isFlipping = !isFlipping; // f

      if (detectCollisions()) {
        if (isMovingLeft) marker.position.x += 5;
        if (isMovingRight) marker.position.x -= 5;
        if (isMovingForward) marker.position.z += 5;
        if (isMovingBack) marker.position.z -= 5;
      }
    });

    document.addEventListener('keyup', function (event) {
      const code = event.keyCode;
      if (code === 37) isMovingLeft = false;
      if (code === 38) isMovingForward = false;
      if (code === 39) isMovingRight = false;
      if (code === 40) isMovingBack = false;
    });

    function detectCollisions() {
      const raycaster = new THREE.Raycaster(marker.position, new THREE.Vector3(0, -1, 0));
      raycaster.set(marker.position, new THREE.Vector3(0, -1, 0));
      const intersects = raycaster.intersectObjects(notAllowed);
      return intersects.length > 0;
    }

    return () => {
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="jack-in-the-box" ref={containerRef} />
  );
};

export default Avatar;
