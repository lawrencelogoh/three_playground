import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);



// Animation With delta time
// let time = Date.now()

// const tick = () => {

//   // Time
//   const currentTime = Date.now()
//   const deltaTime = currentTime - time;

//   time = currentTime;
  
//   // Update objects
//   mesh.rotation.y += 0.001 * deltaTime;
  
//   // Render
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick)
// }

// With clock

const clock = new THREE.Clock()

const tick = () => {

  // Time
  const elaspedTime = clock.getElapsedTime()
  
  // Update objects
  // This means 1 revolution per second
  // mesh.rotation.y = elaspedTime * 2 * Math.PI

  // Other cool updates
  // mesh.position.y = Math.sin(elaspedTime)
  // mesh.position.x = Math.cos(elaspedTime)

  // Or you can move the camera instead

  camera.position.y = Math.sin(elaspedTime)
  camera.position.x = Math.cos(elaspedTime)
  camera.lookAt(mesh.position)

 
  mesh.rotation.y = elaspedTime
  
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}

// You can also use gsap to do specific things like so
gsap.to(mesh.position, {x: 2, duration: 1, delay: 1})

tick()
