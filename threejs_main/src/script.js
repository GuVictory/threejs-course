import * as THREE from 'three';

import './style.css';

// Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

// Камера
const sizes = {
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
