import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

const Avatar = () => {
    const containerRef = useRef(null); // Create a ref for the container

  useEffect(() => {
    // My code for the Avatar project will go here

  // This is where stuff in our game will happen:
  var scene = new THREE.Scene();

  // This is what sees the stuff:
  var aspect_ratio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.z = 500;
  

  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

var not_allowed = [];
var marker = new THREE.Object3D();
scene.add(marker);

var cover = new THREE.MeshNormalMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, cover);
marker.add(avatar);

var hand = new THREE.SphereGeometry(50);

var right_hand = new THREE.Mesh(hand, cover);
right_hand.position.set(-150, 0, 0);
avatar.add(right_hand);


var left_hand = new THREE.Mesh(hand, cover);
left_hand.position.set(150, 0, 0);
avatar.add(left_hand);

var foot = new THREE.SphereGeometry(50);

var right_foot = new THREE.Mesh(foot, cover);
right_foot.position.set(-75, -125, 0);
avatar.add(right_foot);

var left_foot = new THREE.Mesh(foot, cover);
left_foot.position.set(75, -125, 0);
avatar.add(left_foot);

var eyes = new THREE.SphereGeometry(25);

var right_eyes = new THREE.Mesh(eyes, cover);
right_eyes.position.set(-40, 25, 80);
avatar.add(right_eyes);

var left_eyes = new THREE.Mesh(eyes, cover);
left_eyes.position.set(40, 25, 80);
avatar.add(left_eyes);

 marker.add(camera);
//TREE's are HERE!!!!
makeTreeAt(500,0);
makeTreeAt(-500,0);
makeTreeAt(750,-1000);
makeTreeAt(-750,-1000);
makeTreeAt(1000,0);
makeTreeAt(-1000,0);
makeTreeAt(1250,-1000);
makeTreeAt(-1250,-1000);
makeTreeAt(1500,0);
makeTreeAt(-1500,0);
makeTreeAt(1750,-1000);
makeTreeAt(-1750,-1000);
makeTreeAt(2000,0);
makeTreeAt(-2000,0);
makeTreeAt(2250,-1000);
makeTreeAt(-2250,-1000);
            //^    
//Leave alone |

function makeTreeAt(x,z) {
  var trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(50,50,200),
    new THREE.MeshBasicMaterial({color: 0xA0522D})
    );


var top = new THREE.Mesh(
  new THREE.SphereGeometry(150),
  new THREE.MeshBasicMaterial({color: 0x228B22})
  );
   
   var boundary = new THREE.Mesh(
new THREE.CircleGeometry(300),
    new THREE.MeshNormalMaterial()
);
boundary.position.y = -100;
boundary.rotation.x = -Math.PI/2
trunk.add(boundary);

not_allowed.push(boundary);
  
  
  
  top.position.y = 175;
  trunk.add(top);
  
  trunk.position.set(x, -75,z);
  scene.add(trunk);
}





// Now, show what the camera sees on the screen:
var clock = new THREE.Clock(true);
  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    walk();
    turn();
    acrobatics();
    renderer.render(scene, camera);
    }
    animate();

    function turn(direction) {
        new TWEEN.Tween({ y: avatar.rotation.y })
          .to({ y: direction }, 100) // Adjust rotation based on direction
          .onUpdate(function () {
            avatar.rotation.y = this.y;
          })
          .start();
      }
  
      function moveAvatar() {
        const speed = 5;
        avatar.translateZ(-speed); // Move forward based on avatar's rotation
      }
  
      function walk() {
        if (!isWalking()) return;
        var position = Math.sin(clock.getElapsedTime() * 5) * 50;
        right_hand.position.z = position;
        left_hand.position.z = -position;
        right_foot.position.z = -position;
        left_foot.position.z = position;
      }
  
      function spinAvatar(direction) {
        new TWEEN.Tween({ y: avatar.rotation.y })
          .to({ y: direction }, 100)
          .onUpdate(function () {
            avatar.rotation.y = this.y;
          })
          .start();
      }
  
      function isWalking() {
        return is_moving_forward || is_moving_back || is_moving_right || is_moving_left;
      }

 
     var is_cartwheeling = false;
  var is_flipping = false;
    function acrobatics() {
    if (is_cartwheeling) {
    
   avatar.rotation.z  = avatar.rotation.z + 0.05;
    }
   if (is_flipping){
   avatar.rotation.x  = avatar.rotation.x - 0.05;
  
   } 
    }
  

// Listen for keypress events
  var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
  function isWalking() {
    if (is_moving_right) return true;
    if (is_moving_left)return true;
    if (is_moving_forward)return true;
    if (is_moving_back)return true;
  return false;
  }
  document.addEventListener('keydown', function(event) {
 
  var code = event.keyCode;
  if (code === 37){ 
    marker.position.x = marker.position.x-5; // left
  is_moving_left = true;
  }
  if (code === 38){ marker.position.z = marker.position.z-5; // up
  is_moving_forward = true;
  }
  if (code === 39){ marker.position.x = marker.position.x+5; // right
  is_moving_right = true;
  }
  if (code === 40){ marker.position.z = marker.position.z+5; // down
  is_moving_back = true;
  }
  if (code === 68) is_cartwheeling = !is_cartwheeling;      // d
  
   if (code === 70) is_flipping = !is_flipping;             // f
 
 if (detectCollisions()) {
 if (is_moving_left) marker.position.x = marker.position.x+5
 if (is_moving_right) marker.position.x = marker.position.x-5
 if (is_moving_forward) marker.position.z = marker.position.z+5
 if (is_moving_back) marker.position.z = marker.position.z-5
 }
  });
  
  document.addEventListener('keyup', function(event) {
  var code = event.keyCode;
  
  if (code === 37) is_moving_left = false;
  if (code === 38) is_moving_forward = false;
  if (code === 39) is_moving_right = false;
  if (code === 40) is_moving_back = false;
  });

  function detectCollisions() {
    var raycaster = new THREE.Raycaster();
    var direction = new THREE.Vector3(0, -1, 0); // Ray direction
  
    raycaster.set(marker.position, direction); // Set ray origin and direction
    var intersects = raycaster.intersectObjects(not_allowed); // Check for intersections with objects in the not_allowed array
  
    return intersects.length > 0; // Return true if any objects were intersected
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
