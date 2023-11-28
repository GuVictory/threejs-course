import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import * as dat from 'lil-gui';
import './style.css';

const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const cursor = {
    x: 0,
    y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.y = 0.8;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

const gui = new dat.GUI({ closeFolders: true, width: 200 });

const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('/textures/lava/basecolor.jpg');
const roughness = textureLoader.load('/textures/lava/roughness.jpg');
const norm = textureLoader.load('/textures/lava/normal.jpg');
const ao = textureLoader.load('/textures/lava/ambientOcclusion.jpg');
const emissive = textureLoader.load('/textures/lava/emissive.jpg');
const height = textureLoader.load('/textures/lava/height.png');

const geometry = new THREE.SphereGeometry(2, 100, 100);
const material = new THREE.MeshStandardMaterial({});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);




const light = new THREE.AmbientLight(0xefefef, 1.5);
const pointLight = new THREE.PointLight(0xff9000, 3);
pointLight.position.set(3, 3, 3);
const pointLight2 = new THREE.PointLight(0x000000, 6);
pointLight2.position.set(-3, -3, 3);

scene.add(light);
scene.add(pointLight);
scene.add(pointLight2);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
const clock = new THREE.Clock();

const tick = () => {
    stats.begin();
    const delta = clock.getDelta();
    mesh.rotation.y += delta * 0.2;

    controls.update();
    renderer.render(scene, camera);

    stats.end();
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
    // Обновляем размеры
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});

