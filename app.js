import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'https://unpkg.com/dat.gui@0.7.9/build/dat.gui.module.js';

let scene, camera, renderer, controls;
let starMeshes = []; // Array to store individual star meshes for click detection

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Orbit Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;


    // Starfield Background
    createStarfield();

    // Random Stars
    createRandomStars();

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(starMeshes);

        if (intersects.length > 0) {
            console.log('Star clicked!', intersects[0].object);
            // star information display panel
        }
    });

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);

    // GUI Controls
    setupGUI();

    // Start the animation loop
    animate();
}

function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);
}

function createRandomStars() {
    const starGeometry = new THREE.SphereGeometry(0.5, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial.clone());
        star.position.x = (Math.random() - 0.5) * 200;
        star.position.y = (Math.random() - 0.5) * 200;
        star.position.z = (Math.random() - 0.5) * 200;
        scene.add(star);
        starMeshes.push(star); // Add to array for click detection
    }
}

function setupGUI() {
    const gui = new GUI();
    const starFolder = gui.addFolder('Stars');

    const params = {
        showStars: true,
        starSize: 0.5,
        backgroundColor: '#000000'
    };

    starFolder.add(params, 'showStars').onChange((value) => {
        scene.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'SphereGeometry') {
                child.visible = value;
            }
        });
    });

    starFolder.add(params, 'starSize', 0.1, 2).onChange((value) => {
        scene.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'SphereGeometry') {
                child.scale.set(value, value, value);
            }
        });
    });

    gui.addColor(params, 'backgroundColor').onChange((value) => {
        renderer.setClearColor(value);
    });

    starFolder.open();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// need to add star data with names, distances, spectral types
// need to mplement star information panel on click
// need to add constellation lines
// try to optimize with instanced meshes for better performance

init(); 