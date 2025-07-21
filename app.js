import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { orionData } from './data.js';

let scene, camera, renderer, raycaster, controls;
let overviewCameraPosition;
let isExploring = false;
const clickableObjects = [];
let selectedStar = null;

let orionStarMeshes = [];
let orionLineMeshes = [];

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
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onClick, false);
    document.getElementById('back-button').addEventListener('click', onBackButtonClick);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (isExploring) controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

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

function zoomToConstellation(constellation) {
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
        }
    }
    requestAnimationFrame(animationStep);
}

function showInfoPanel(data) {
    document.getElementById('constellation-name').innerText = data.name;
    document.getElementById('constellation-info').innerHTML = data.info;
    document.getElementById('info-panel').style.display = 'block';
    document.getElementById('back-button').style.display = 'block';
}

function hideInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('star-popup').style.display = 'none';
}

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
        }
    }
    requestAnimationFrame(animationStep);
}

init(); 