import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Light blue for daytime sky

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(15, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ground (Street)
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x2f2f2f }) // Asphalt-like color
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Road Lines
const roadLineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
for (let i = -20; i <= 20; i += 4) {
  const roadLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.01, 2),
    roadLineMaterial
  );
  roadLine.position.set(i, 0.01, 0);
  scene.add(roadLine);
}

// Street Divider
const divider = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.2, 50),
  new THREE.MeshStandardMaterial({ color: 0x4b4b4b })
);
divider.position.set(0, 0.1, 0);
scene.add(divider);

// Buildings
const buildingMaterialTall = new THREE.MeshStandardMaterial({ color: 0x808080 });
const buildingMaterialSmall = new THREE.MeshStandardMaterial({ color: 0x404040 });

// Tall Building 1
const tallBuilding1 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 20, 4),
  buildingMaterialTall
);
tallBuilding1.position.set(-8, 10, 8);
tallBuilding1.castShadow = true;
scene.add(tallBuilding1);

// Tall Building 2
const tallBuilding2 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 20, 4),
  buildingMaterialTall
);
tallBuilding2.position.set(-8, 10, 12);
tallBuilding2.castShadow = true;
scene.add(tallBuilding2);

// Small Building
const smallBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(6, 10, 6),
  buildingMaterialSmall
);
smallBuilding.position.set(8, 5, -8);
smallBuilding.castShadow = true;
scene.add(smallBuilding);

// Plain Field with Bushes
const field = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x228b22 }) // Green field
);
field.rotation.x = -Math.PI / 2;
field.position.set(-12, 0.01, -12);
scene.add(field);

// Bushes
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
for (let i = -15; i <= -10; i += 2) {
  const bush = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    bushMaterial
  );
  bush.position.set(i, 1, -15);
  bush.castShadow = true;
  scene.add(bush);
}

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
