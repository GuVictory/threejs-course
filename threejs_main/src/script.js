import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
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

/** Геометрии */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.CircleGeometry(1, 20, 0, Math.PI);
// const geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
// const geometry = new THREE.ConeGeometry(1, 2, 32, 1, true, 0, Math.PI);
// const geometry = new THREE.CylinderGeometry(0.5, 1, 2, 16, 4, true);
// const geometry = new THREE.RingGeometry(0.5, 1, 16);
// const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
// const geometry = new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 5);
// const geometry = new THREE.DodecahedronGeometry(1, 0);
// const geometry = new THREE.OctahedronGeometry(1, 0);
// const geometry = new THREE.TetrahedronGeometry(1, 0);
// const geometry = new THREE.IcosahedronGeometry(1, 0);
const geometry = new THREE.SphereGeometry(1, 32, 16);

/**************/

const material = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
    const delta = clock.getDelta();
    mesh.rotation.y += delta * 0.4;

    controls.update();
    renderer.render(scene, camera);

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
