import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000033); // Nighttime background (dark blue)
scene.fog = new THREE.Fog(0x000033, 50, 100); // Fog starts at 50 and ends at 100

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
const park = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), new THREE.MeshStandardMaterial({ color: 0x228b22 }));
park.rotation.x = -Math.PI / 2;
park.position.set(15, 0.1, -15); // Slightly elevate the park
scene.add(park);

// Bushes
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });

// Corner Bushes (Smaller)
const cornerBushSize = 1.2;
const closerBushPositions = [
  [10, -10], // Top-left closer to the center
  [20, -10], // Top-right closer to the center
  [10, -20], // Bottom-left closer to the center
  [20, -20]  // Bottom-right closer to the center
];

closerBushPositions.forEach(([x, z]) => {
  const bush = new THREE.Mesh(new THREE.SphereGeometry(cornerBushSize, 8, 8), bushMaterial);
  bush.position.set(x, cornerBushSize, z);
  bush.castShadow = true;
  scene.add(bush);
});

// Center Bush (Larger)
const centerBush = new THREE.Mesh(new THREE.SphereGeometry(2, 12, 12), bushMaterial);
centerBush.position.set(15, 2, -15);
centerBush.castShadow = true;
scene.add(centerBush);

// Block 4: One Tall Building (Southwest)
const tallBuilding2 = new THREE.Mesh(new THREE.BoxGeometry(10, 40, 10), tallBuildingMaterial);
tallBuilding2.position.set(-15, 20, -15);
tallBuilding2.castShadow = true;
scene.add(tallBuilding2);

// Streetlights
const streetlightMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });

const createStreetlight = (x, z) => {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 6, 16), streetlightMaterial); // Smaller pole
  pole.position.set(x, 3, z); // Adjusted height
  pole.castShadow = true;
  scene.add(pole);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), lightMaterial); // Smaller bulb
  bulb.position.set(x, 6.5, z);
  bulb.castShadow = true;
  scene.add(bulb);

  const light = new THREE.PointLight(0xffd700, 1.5, 15);
  light.position.set(x, 6.5, z);
  light.castShadow = true;
  scene.add(light);
};

// Updated streetlight positions (as per red dots in your image)
const streetlightPositions = [
  [-25, 25], [-15, 25], [25, 25], [25, 15], 
  [25, -25], [15, -25], [-25, -25], [-25, -15]
];

streetlightPositions.forEach(([x, z]) => createStreetlight(x, z));

// Lighting
const ambientLight = new THREE.AmbientLight(0x444466, 0.5); // Dim ambient light for nighttime
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xffffff, 0.5);
moonLight.position.set(30, 50, -20);
moonLight.castShadow = true;
scene.add(moonLight);

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

