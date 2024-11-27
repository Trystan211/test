import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Light blue for the daytime sky

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(15, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ground (Street Crossroads)
const streetMaterial = new THREE.MeshStandardMaterial({ color: 0x2f2f2f }); // Asphalt-like color
const street = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), streetMaterial);
street.rotation.x = -Math.PI / 2;
street.receiveShadow = true;
scene.add(street);

// Sidewalk Lines
const sidewalkMaterial = new THREE.MeshStandardMaterial({ color: 0x4b4b4b }); // Darker gray for the sidewalk
const sidewalkSize = 5;
for (let i = -20; i <= 20; i += sidewalkSize) {
  for (let j = -20; j <= 20; j += sidewalkSize) {
    if (i === 0 || j === 0) continue; // Skip streets
    const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(sidewalkSize, sidewalkSize), sidewalkMaterial);
    sidewalk.rotation.x = -Math.PI / 2;
    sidewalk.position.set(i, 0.01, j);
    scene.add(sidewalk);
  }
}

// Buildings
const tallBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const smallBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });

// Block 1: Two Tall Buildings (Northwest)
for (let i = -15; i <= -10; i += 5) {
  const tallBuilding = new THREE.Mesh(new THREE.BoxGeometry(4, 20, 4), tallBuildingMaterial);
  tallBuilding.position.set(i, 10, 15);
  tallBuilding.castShadow = true;
  scene.add(tallBuilding);
}

// Block 2: Small Building (Northeast)
const smallBuilding = new THREE.Mesh(new THREE.BoxGeometry(8, 10, 8), smallBuildingMaterial);
smallBuilding.position.set(15, 5, 15);
smallBuilding.castShadow = true;
scene.add(smallBuilding);

// Block 3: Park with Bushes (Southeast)
const park = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x228b22 })); // Green for grass
park.rotation.x = -Math.PI / 2;
park.position.set(15, 0.01, -15);
scene.add(park);

const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
for (let i = 12; i <= 18; i += 2) {
  for (let j = -18; j <= -12; j += 2) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), bushMaterial);
    bush.position.set(i, 1, j);
    bush.castShadow = true;
    scene.add(bush);
  }
}

// Block 4: Empty Southwest Block
const emptyBlock = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x2e8b57 })); // Slightly different green
emptyBlock.rotation.x = -Math.PI / 2;
emptyBlock.position.set(-15, 0.01, -15);
scene.add(emptyBlock);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, -20);
sunLight.castShadow = true;
scene.add(sunLight);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Animation
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

