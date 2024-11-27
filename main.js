import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(15, 25, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ground (Street Crossroads)
const streetMaterial = new THREE.MeshStandardMaterial({ color: 0x2f2f2f });
const street = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), streetMaterial);
street.rotation.x = -Math.PI / 2;
street.receiveShadow = true;
scene.add(street);

// Add white street stripes
const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
for (let i = -20; i <= 20; i += 5) {
  if (i !== 0) {
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.2), stripeMaterial);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(i, 0.01, 0);
    scene.add(stripe);

    const stripeVertical = stripe.clone();
    stripeVertical.rotation.z = Math.PI / 2;
    stripeVertical.position.set(0, 0.01, i);
    scene.add(stripeVertical);
  }
}

// Gray floors for the blocks
const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

const blockSize = 20;
const blockPositions = [
  [-15, 0, 15], // Block 1: Northwest
  [15, 0, 15],  // Block 2: Northeast
  [15, 0, -15], // Block 3: Southeast
  [-15, 0, -15] // Block 4: Southwest
];

blockPositions.forEach(([x, y, z]) => {
  const block = new THREE.Mesh(new THREE.PlaneGeometry(blockSize, blockSize), blockMaterial);
  block.rotation.x = -Math.PI / 2;
  block.position.set(x, y + 0.01, z);
  block.receiveShadow = true;
  scene.add(block);
});

// Buildings
const tallBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x505050 });
const smallBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });

// Block 1: One Tall Building (Northwest)
const tallBuilding1 = new THREE.Mesh(new THREE.BoxGeometry(8, 35, 8), tallBuildingMaterial);
tallBuilding1.position.set(-15, 17.5, 15);
tallBuilding1.castShadow = true;
scene.add(tallBuilding1);

// Block 2: Small Building (Northeast)
const smallBuilding = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15), smallBuildingMaterial);
smallBuilding.position.set(15, 7.5, 15);
smallBuilding.castShadow = true;
scene.add(smallBuilding);

// Block 3: Park with Bushes (Southeast)
const park = new THREE.Mesh(new THREE.PlaneGeometry(25, 25), new THREE.MeshStandardMaterial({ color: 0x228b22 }));
park.rotation.x = -Math.PI / 2;
park.position.set(15, 0.01, -15);
scene.add(park);

const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
for (let i = 8; i <= 22; i += 3) {
  for (let j = -22; j <= -8; j += 3) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8), bushMaterial);
    bush.position.set(i, 1.5, j);
    bush.castShadow = true;
    scene.add(bush);
  }
}

// Block 4: One Tall Building (Southwest)
const tallBuilding2 = new THREE.Mesh(new THREE.BoxGeometry(10, 40, 10), tallBuildingMaterial);
tallBuilding2.position.set(-15, 20, -15);
tallBuilding2.castShadow = true;
scene.add(tallBuilding2);

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
