/*
Main application logic
Handles setup, rendering, user interactions, and animations
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { orionData, bigDipperData, cassiopeiaData } from './data.js';

let scene, camera, renderer, raycaster, controls;
let overviewCameraPosition;
let isExploring = false;
const clickableObjects = [];
let selectedStar = null;
let time = 0;

let orionStarMeshes = [];
let orionLineMeshes = [];
let bigDipperStarMeshes = [];
let bigDipperLineMeshes = [];
let cassiopeiaStarMeshes = [];
let cassiopeiaLineMeshes = [];

// Creates Orion constellation with stars and connecting lines
function createOrion() {
    const group = new THREE.Group();
    orionStarMeshes = [];
    orionLineMeshes = [];
    orionData.stars.forEach((star, i) => {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xeeeeff, shininess: 50 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(star.x, star.y, star.z);
        mesh.userData = { type: 'star', ...star };
        group.add(mesh);
        orionStarMeshes.push(mesh);
        clickableObjects.push(mesh);
    });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6688ff, transparent: true, opacity: 0.7 });
    orionData.connections.forEach(connection => {
        const points = [
            orionStarMeshes[connection[0]].position,
            orionStarMeshes[connection[1]].position
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
        orionLineMeshes.push(line);
    });
    group.position.set(orionData.position.x, orionData.position.y, orionData.position.z);
    group.userData = { type: 'constellation', ...orionData };
    scene.add(group);
    clickableObjects.push(group);
}

// Creates Big Dipper with yellow/gold styling
function createBigDipper() {
    const group = new THREE.Group();
    bigDipperStarMeshes = [];
    bigDipperLineMeshes = [];
    bigDipperData.stars.forEach((star, i) => {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xfffbe0, emissive: 0xeeeecc, shininess: 50 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(star.x, star.y, star.z);
        mesh.userData = { type: 'star', ...star };
        group.add(mesh);
        bigDipperStarMeshes.push(mesh);
        clickableObjects.push(mesh);
    });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.7 });
    bigDipperData.connections.forEach(connection => {
        const points = [
            bigDipperStarMeshes[connection[0]].position,
            bigDipperStarMeshes[connection[1]].position
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
        bigDipperLineMeshes.push(line);
    });
    group.position.set(bigDipperData.position.x, bigDipperData.position.y, bigDipperData.position.z);
    group.userData = { type: 'constellation', ...bigDipperData };
    scene.add(group);
    clickableObjects.push(group);
}

// Creates Cassiopeia with white stars and purple lines
function createCassiopeia() {
    const group = new THREE.Group();
    cassiopeiaStarMeshes = [];
    cassiopeiaLineMeshes = [];
    cassiopeiaData.stars.forEach((star, i) => {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xe6e6ff, shininess: 80 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(star.x, star.y, star.z);
        mesh.userData = { type: 'star', ...star };
        group.add(mesh);
        cassiopeiaStarMeshes.push(mesh);
        clickableObjects.push(mesh);
    });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd580ff, transparent: true, opacity: 0.85 });
    cassiopeiaData.connections.forEach(connection => {
        const points = [
            cassiopeiaStarMeshes[connection[0]].position,
            cassiopeiaStarMeshes[connection[1]].position
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
        cassiopeiaLineMeshes.push(line);
    });
    group.position.set(cassiopeiaData.position.x, cassiopeiaData.position.y, cassiopeiaData.position.z);
    group.userData = { type: 'constellation', ...cassiopeiaData };
    scene.add(group);
    clickableObjects.push(group);
}

// Creates background starfield with random stars
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);
}

// Initialize Three.js scene, camera, and controls
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 100);
    overviewCameraPosition = camera.position.clone();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    raycaster = new THREE.Raycaster();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);
    createStarfield();
    createOrion();
    createBigDipper();
    createCassiopeia();
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onClick, false);
    document.getElementById('back-button').addEventListener('click', onBackButtonClick);
    animate();
}

// Main animation loop with star shimmering effects
function animate() {
    requestAnimationFrame(animate);
    time += 0.016;
    
    if (isExploring) controls.update();
    updateBigDipperLines();
    updateCassiopeiaLines();
    
    // Star shimmering animations for each constellation
    orionStarMeshes.forEach(mesh => {
        const shimmer = Math.sin(time * 3 + mesh.position.x * 0.5) * 0.3 + 0.7;
        mesh.material.emissiveIntensity = shimmer;
        mesh.scale.setScalar(0.8 + shimmer * 0.4);
    });
    
    bigDipperStarMeshes.forEach(mesh => {
        const shimmer = Math.sin(time * 2.5 + mesh.position.x * 0.3) * 0.4 + 0.6;
        mesh.material.emissiveIntensity = shimmer;
        mesh.scale.setScalar(0.7 + shimmer * 0.5);
    });
    
    cassiopeiaStarMeshes.forEach(mesh => {
        const shimmer = Math.sin(time * 3.5 + mesh.position.x * 0.4) * 0.35 + 0.65;
        mesh.material.emissiveIntensity = shimmer;
        mesh.scale.setScalar(0.75 + shimmer * 0.45);
    });
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse clicks for constellation and star interactions
function onClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, true);
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        if (!isExploring) {
            while(clickedObject.parent && clickedObject.userData.type !== 'constellation') {
                clickedObject = clickedObject.parent;
            }
            if (clickedObject.userData.type === 'constellation') {
                zoomToConstellation(clickedObject);
            }
        } else if (isExploring && clickedObject.userData.type === 'star') {
            if (selectedStar === clickedObject) {
                hideStarPopup();
                selectedStar = null;
            } else {
                showStarPopup(clickedObject.userData, event);
                selectedStar = clickedObject;
            }
        }
    } else {
        hideStarPopup();
        selectedStar = null;
    }
}

// Animate Big Dipper stars between 2D and 3D positions
function animateBigDipperZ(to3D, duration = 1000) {
    if (!bigDipperStarMeshes || !bigDipperStarMeshes.length) return;
    const startZs = bigDipperStarMeshes.map(mesh => mesh.position.z);
    const targetZs = bigDipperData.stars.map(star => to3D ? (star.z3d || 0) : 0);
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        for (let i = 0; i < bigDipperStarMeshes.length; i++) {
            bigDipperStarMeshes[i].position.z = startZs[i] + (targetZs[i] - startZs[i]) * progress;
        }
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Update Big Dipper line positions to follow star movements
function updateBigDipperLines() {
    if (!bigDipperLineMeshes || !bigDipperLineMeshes.length) return;
    bigDipperData.connections.forEach((connection, i) => {
        const start = bigDipperStarMeshes[connection[0]].position;
        const end = bigDipperStarMeshes[connection[1]].position;
        const line = bigDipperLineMeshes[i];
        line.geometry.setFromPoints([start, end]);
        line.geometry.attributes.position.needsUpdate = true;
    });
}

// Animate Cassiopeia stars between 2D and 3D positions
function animateCassiopeiaZ(to3D, duration = 1000) {
    if (!cassiopeiaStarMeshes || !cassiopeiaStarMeshes.length) return;
    const startZs = cassiopeiaStarMeshes.map(mesh => mesh.position.z);
    const targetZs = cassiopeiaData.stars.map(star => to3D ? (star.z3d || 0) : 0);
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        for (let i = 0; i < cassiopeiaStarMeshes.length; i++) {
            cassiopeiaStarMeshes[i].position.z = startZs[i] + (targetZs[i] - startZs[i]) * progress;
        }
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Update Cassiopeia line positions to follow star movements
function updateCassiopeiaLines() {
    if (!cassiopeiaLineMeshes || !cassiopeiaLineMeshes.length) return;
    cassiopeiaData.connections.forEach((connection, i) => {
        const start = cassiopeiaStarMeshes[connection[0]].position;
        const end = cassiopeiaStarMeshes[connection[1]].position;
        const line = cassiopeiaLineMeshes[i];
        line.geometry.setFromPoints([start, end]);
        line.geometry.attributes.position.needsUpdate = true;
    });
}

// Show constellation info panel
function showInfoPanel(data) {
    document.getElementById('constellation-name').innerText = data.name;
    document.getElementById('constellation-info').innerHTML = data.info;
    document.getElementById('info-panel').style.display = 'block';
    document.getElementById('back-button').style.display = 'block';
}

// Hide info panel and reset UI
function hideInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('star-popup').style.display = 'none';
}

// Show star information popup
function showStarPopup(data, event) {
    const popup = document.getElementById('star-popup');
    document.getElementById('star-name').innerText = data.name;
    document.getElementById('star-brightness').innerText = data.brightness;
    document.getElementById('star-distance').innerText = data.distance;
    popup.style.display = 'block';
    popup.style.left = `${event.clientX + 10}px`;
    popup.style.top = `${event.clientY + 10}px`;
}

function hideStarPopup() {
    document.getElementById('star-popup').style.display = 'none';
}

// Return to overview button
function onBackButtonClick() {
    isExploring = false;
    controls.enabled = false;
    hideInfoPanel();
    const startPosition = camera.position.clone();
    const startLookAt = controls.target.clone();
    const duration = 1500;
    let startTime = null;
    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        camera.position.lerpVectors(startPosition, overviewCameraPosition, progress);
        const lookAtTarget = new THREE.Vector3().lerpVectors(startLookAt, new THREE.Vector3(0, 0, 0), progress);
        camera.lookAt(lookAtTarget);
        if (progress < 1) {
            requestAnimationFrame(animationStep);
        } else {
            animateBigDipperZ(false);
            animateCassiopeiaZ(false);
            controls.target.set(0, 0, 0);
            controls.update();
            document.getElementById('overview-header').style.display = 'block';
        }
    }
    requestAnimationFrame(animationStep);
}

// Zoom into selected constellation
function zoomToConstellation(constellation) {
    document.getElementById('overview-header').style.display = 'none';
    controls.target.copy(constellation.position);
    controls.update();
    isExploring = true;
    const targetPosition = constellation.position.clone().add(new THREE.Vector3(0, 0, 35));
    const targetLookAt = constellation.position.clone();
    const startPosition = camera.position.clone();
    const duration = 1500;
    let startTime = null;
    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        camera.position.lerpVectors(startPosition, targetPosition, progress);
        camera.lookAt(targetLookAt);
        if (progress < 1) {
            requestAnimationFrame(animationStep);
        } else {
            controls.enabled = true;
            controls.target.copy(targetLookAt);
            showInfoPanel(constellation.userData);
            if (constellation.userData.name === 'Big Dipper') animateBigDipperZ(true);
            if (constellation.userData.name === 'Cassiopeia') animateCassiopeiaZ(true);
        }
    }
    requestAnimationFrame(animationStep);
}

init(); 