import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(2, 0.5, 0.5)


// Pi is used for a half rotation
// If you want to do a full rotation for example
// You can just multiply 2 by Pi
// One other thing is that there is an order to rotation
// You can change it with rotation.reorder() though
// There are also quartenions which alter rotations
// Rotations also alter quarternions

// mesh.rotation.y = Math.PI * 0.25;

// scene.add(mesh);




const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 0.5;

// Camera positioning and rotation can be hard
// one thing you can do is to use .lookAt

// camera.lookAt(mesh.position)

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});


const axesHelper = new THREE.AxesHelper()

scene.add(axesHelper)

// Groups

const group = new THREE.Group()
scene.add(group)



const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xff0000 })
)


group.add(cube)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x00ff00 })
)


cube1.position.x = -2;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x0000ff })
)


cube2.position.x = +2;
group.add(cube2);


// You can transform groups similarly to how you transform objects
group.position.y = 1;
group.rotation.y = 1;


renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
