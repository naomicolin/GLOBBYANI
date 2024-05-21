// Import Three.js and necessary add-ons
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

// Initialize scene, camera, renderer, and clock
let scene, camera, renderer, clock;
let sceneContainer = document.querySelector("#scene-container");

// Audio and listener setup
let listener, audioLoader;

// Animation mixers
let mixers = [];

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdadb12); // Sets clear color to a yellowish-green
    sceneContainer.appendChild(renderer.domElement);

    // Lighting
    const lightRight = new THREE.DirectionalLight(0xffffff, 5);
    lightRight.position.set(0, 50, 30);
    scene.add(lightRight);
    const lightLeft = new THREE.DirectionalLight(0xffffff, 3);
    lightLeft.position.set(50, 0, 20);
    scene.add(lightLeft);

    // Camera setup
    camera.position.z = 50;

    // Audio setup
    listener = new THREE.AudioListener();
    camera.add(listener);
    audioLoader = new THREE.AudioLoader();

    // OrbitControls
    new OrbitControls(camera, renderer.domElement);

    // Load models with their sounds and animations
    loadModelAndSound('assets/GREEN.gltf', [-10, 40, 0], [5, 5, 5], 'assets/GREEN.mp3');
    loadModelAndSound('assets/ORANGE.gltf', [50, 24, 0], [6, 6, 6], 'assets/GLOBBY!.mp3');
    loadModelAndSound('assets/RED.gltf', [-50, 1, 0], [5, 5, 5], 'assets/RED.mp3');
    loadModelAndSound('assets/BLUE.gltf', [-17, -11, 0], [40, 40, 40], 'assets/BLUE.mp3');
    loadModelAndSound('assets/PURPLE.gltf', [27, 1, 0], [33, 33, 33], 'assets/GLOBBY!.mp3');
    loadModelAndSound('assets/REDBAD.gltf', [68, -40, 0], [3, 3, 3], 'assets/REDDDD.mp3');
    loadModelAndSound('assets/G.gltf', [135, 20, 0], [70, 70, 70], 'assets/HIGLOBBY2.mp3'); // Title model "glob"
    loadModelAndSound('assets/YELLOW.gltf', [-39, -33, 0], [1.5, 1.5, 1.5], 'assets/YELLOW.mp3');
    loadModelAndSound('assets/TEAL.gltf', [4, 20, 0], [2, 2, 2], 'assets/BLUE.mp3');




    ////////NUMBERS////////
    loadModelAndSound('assets/ONE.gltf', [427, -90, 0], [500, 500, 500], 'assets/1.mp3'); // 
    loadModelAndSound('assets/TWO.gltf', [507, -115, 0], [600, 600, 600], 'assets/2.mp3'); // 
    loadModelAndSound('assets/THREE.gltf', [515, -120, 0], [600, 600, 600], 'assets/3.mp3'); // 
    loadModelAndSound('assets/FOUR.gltf', [510, -128, 0], [600, 600, 600], 'assets/4.mp3'); // 
    loadModelAndSound('assets/FIVE.gltf', [510, -114, 0], [600, 600, 600], 'assets/5.mp3'); // 
    loadModelAndSound('assets/SIX.gltf', [447, -140, 0], [700, 700, 700], 'assets/6.mp3'); // 
    loadModelAndSound('assets/SEVEN.gltf', [439, -150, 0], [700, 700, 700], 'assets/7.mp3'); // 
    loadModelAndSound('assets/EIGHT.gltf', [397, -141, 0], [650, 650, 650], 'assets/8.mp3');
    loadModelAndSound('assets/NINE.gltf', [324, -124, 0], [550, 550, 550], 'assets/9.mp3');
    loadModelAndSound('assets/TEN.gltf', [163, -55, 0], [200, 200, 200], 'assets/10.mp3');


    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixers.forEach(mixer => mixer.update(delta));
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const loader = new GLTFLoader();

function loadModelAndSound(modelUrl, position, scale, soundUrl) {
    loader.load(modelUrl, function (gltf) {
        const model = gltf.scene;
        model.position.set(...position);
        model.scale.set(...scale);
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => {
            mixer.clipAction(clip).play();
        });
        mixers.push(mixer);

        const sound = new THREE.Audio(listener);
        audioLoader.load(soundUrl, function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });

        renderer.domElement.addEventListener('click', function(event) {
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(model, true);
            if (intersects.length > 0) {
                sound.play();
            }
        });
    }, undefined, function (error) {
        console.error('An error happened while loading the model:', error);
    });
}

init(); 
