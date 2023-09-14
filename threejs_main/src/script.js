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

const parameters = {
    color: 0xff0000,
};

const cursor = {
    x: 0,
    y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

// Отладка
const gui = new dat.GUI({ closeFolders: true, width: 400 });

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

const scaleFolder = gui.addFolder('Scale');
scaleFolder.add(mesh.scale, 'x').min(0).max(5).step(0.1).name('Box scale x');
scaleFolder.add(mesh.scale, 'y').min(0).max(5).step(0.1).name('Box scale y');
scaleFolder.add(mesh.scale, 'z').min(0).max(5).step(0.1).name('Box scale z');

gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color);
});

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
    stats.begin();
    const delta = clock.getDelta();
    // mesh.rotation.y += delta * 0.4;

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

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
