import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
// it's easy to build on this to create a cube for example
// Read more: https://threejs.org/docs/#BufferGeometry
const vertices = new Float32Array([
  -1.0,
  -1.0,
  1.0, // v0
  1.0,
  -1.0,
  1.0, // v1
  1.0,
  1.0,
  1.0, // v2
  1.0,
  1.0,
  1.0, // v3
  -1.0,
  1.0,
  1.0, // v4
  -1.0,
  -1.0,
  1.0, // v5
]);
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);

// Debug UI stuff
// Simple mesh position debug ui
const gui = new GUI();

gui.add(mesh.position, "y").min(-1).max(1).step(0.01);
gui.add(material, "wireframe");
// Example of

scene.add(mesh);
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
camera.position.x = 0;
camera.position.y = 0;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const axesHelper = new THREE.AxesHelper();

scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.update();
// controls.update() must be called after any manual changes to the camera's transform
function animate() {
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
