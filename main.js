import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000022); // Nighttime color
scene.fog = new THREE.Fog(0x000022, 20, 70); // Nighttime fog for depth

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(20, 15, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ground
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x303030 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Blocks (gray floor to identify the blocks)
const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x505050 });
const block1 = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), blockMaterial);
block1.rotation.x = -Math.PI / 2;
block1.position.set(-12, 0.01, 12);
scene.add(block1);

const block2 = block1.clone();
block2.position.set(12, 0.01, 12);
scene.add(block2);

const block3 = block1.clone();
block3.position.set(-12, 0.01, -12);
scene.add(block3);

const block4 = block1.clone();
block4.position.set(12, 0.01, -12);
scene.add(block4);

// Streets
const streetMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
const streetX = new THREE.Mesh(new THREE.PlaneGeometry(50, 6), streetMaterial);
streetX.rotation.x = -Math.PI / 2;
scene.add(streetX);

const streetZ = new THREE.Mesh(new THREE.PlaneGeometry(6, 50), streetMaterial);
streetZ.rotation.x = -Math.PI / 2;
scene.add(streetZ);

// Streetlines
const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
for (let i = -24; i <= 24; i += 3) {
  const line = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.5), lineMaterial);
  line.rotation.x = -Math.PI / 2;
  line.position.set(i, 0.02, 0);
  scene.add(line);

  const lineZ = line.clone();
  lineZ.position.set(0, 0.02, i);
  lineZ.rotation.z = Math.PI / 2;
  scene.add(lineZ);
}

// Buildings
const tallBuildingGeometry = new THREE.BoxGeometry(5, 20, 5);
const smallBuildingGeometry = new THREE.BoxGeometry(7, 10, 7);
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });

const tallBuilding1 = new THREE.Mesh(tallBuildingGeometry, buildingMaterial);
tallBuilding1.position.set(-12, 10, 12);
tallBuilding1.castShadow = true;
scene.add(tallBuilding1);

const tallBuilding2 = tallBuilding1.clone();
tallBuilding2.position.set(12, 10, -12);
scene.add(tallBuilding2);

const smallBuilding = new THREE.Mesh(smallBuildingGeometry, buildingMaterial);
smallBuilding.position.set(-12, 5, -12);
smallBuilding.castShadow = true;
scene.add(smallBuilding);

// Park
const parkMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const park = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), parkMaterial);
park.position.set(12, 0.05, 12);
park.rotation.x = -Math.PI / 2;
scene.add(park);

// Bushes
const bushGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
const bushPositions = [
  [10, 0.3, 10],
  [14, 0.3, 10],
  [10, 0.3, 14],
  [14, 0.3, 14],
];
bushPositions.forEach(([x, y, z]) => {
  const bush = new THREE.Mesh(bushGeometry, bushMaterial);
  bush.position.set(x, y, z);
  bush.castShadow = true;
  scene.add(bush);
});

const middleBush = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), bushMaterial);
middleBush.position.set(12, 0.4, 12);
middleBush.castShadow = true;
scene.add(middleBush);

// Streetlights
const streetlightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4);
const lightMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });

const lightPositions = [
  [-15, 2, 12],
  [-9, 2, 12],
  [12, 2, 15],
  [12, 2, 9],
  [15, 2, -12],
  [9, 2, -12],
  [-12, 2, -15],
  [-12, 2, -9],
];

lightPositions.forEach(([x, y, z]) => {
  const pole = new THREE.Mesh(streetlightGeometry, lightMaterial);
  pole.position.set(x, y, z);

  const light = new THREE.PointLight(0xffdd88, 0.5, 10);
  light.position.set(x, 4, z);
  scene.add(pole);
  scene.add(light);
});

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Dim light for the scene
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xccccff, 0.3);
moonLight.position.set(-10, 50, -10);
moonLight.castShadow = true;
scene.add(moonLight);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// Animation
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
