import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BufferGeometry();

const count = 500;
const positionArray = new Float32Array(count * 3 * 3)


for(let i=0; i < count * 3 * 3; i++){
  positionArray[i] = (Math.random() - 0.5) * 4
}


const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);

geometry.setAttribute('position', positionsAttribute);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width/sizes.height

  camera.updateProjectionMatrix()

  
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


window.addEventListener('dblclick', ()=>{
  if (!document.fullscreenElement){
    console.log("go fullscreen")
    canvas.requestFullscreen()
  } else {
    console.log("leave fullscreen")
    document.exitFullscreen()
  }
})

const cursor = {
  x:0,
  y:0
}

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);


// })
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);


// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


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
  
  // Move the camera according to the cursor position

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y;
  // camera.lookAt(mesh.position)
  controls.update()
  
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}

tick()
