// Import Three.js
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

///////CREATE SCENE //////////////////
let scene, camera, renderer, green, orange, red, blue, glob, clock;
let sceneContainer = document.querySelector("#scene-container");
let mixerGreen, mixerOrange, mixerRed, mixerBlue, mixerGlob; // Separate mixers for each animated object

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdadb12); // Sets clear color to a yellowish-green
    renderer.setClearAlpha(1.0); // Opaque

    sceneContainer.appendChild(renderer.domElement);

    const lightRight = new THREE.DirectionalLight(0xffffff, 5);
    lightRight.position.set(5, 10, 5);
    scene.add(lightRight);

    const lightLeft = new THREE.DirectionalLight(0xffffff, 3);
    lightLeft.position.set(-5, 10, -5);
    scene.add(lightLeft);

    camera.position.z = 50;

    // HTML5 Audio setup
    const audioElement = new Audio('assets/HIGLOBBY.mp3'); // Ensure this path is correct

    // Set up raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent any default action to ensure clean handling

        // Calculate mouse coordinates for raycasting
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children, true);
        intersects.forEach(intersect => {
            if (intersect.object === glob) {
                // Check if audio is not already playing
                if (audioElement.paused) {
                    audioElement.play();
                }
            }
        });
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Update mixers
    if (mixerGreen) mixerGreen.update(delta);
    if (mixerOrange) mixerOrange.update(delta);
    if (mixerRed) mixerRed.update(delta);
    if (mixerBlue) mixerBlue.update(delta);
    if (mixerGlob) mixerGlob.update(delta);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();



//////TITLE GLOBBY/////////// 
loader.load('assets/G.gltf', function (gltf) {
    glob = gltf.scene;
    scene.add(glob);
    glob.scale.set(70, 70, 70);

    // Set position of the glob model
    glob.position.set(130, 23, 0);

    mixerGlob = new THREE.AnimationMixer(glob);
    gltf.animations.forEach(clip => {
        let actionGlob = mixerGlob.clipAction(clip);
        actionGlob.play();
    });

    // Load audio file
    audioLoader.load('assets/GLOBBY!.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
    });

    // Add event listener to the model for click interaction
    glob.addEventListener('click', function() {
        sound.play();
    });

}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});




//////GREEN GLOBBY/////////// 
loader.load('assets/GREEN.gltf', function (gltf) {
    green = gltf.scene;
    scene.add(green);
    green.scale.set(5, 5, 5);

    // Set position of the green model
    green.position.set(-10, 40, 0);

    mixerGreen = new THREE.AnimationMixer(green);
    gltf.animations.forEach(clip => {
        let actionGreen = mixerGreen.clipAction(clip);
        actionGreen.play();
    });
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

//////ORANGE GLOBBY/////////// 
loader.load('assets/ORANGE.gltf', function (gltf) {
    orange = gltf.scene;
    scene.add(orange);
    orange.scale.set(6, 6, 6);

    // Set position of the orange model
    orange.position.set(50, 20, 0);

    mixerOrange = new THREE.AnimationMixer(orange);
    gltf.animations.forEach(clip => {
        let actionOrange = mixerOrange.clipAction(clip);
        actionOrange.play();
    });
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

//////RED GLOBBY/////////// 
loader.load('assets/RED.gltf', function (gltf) {
    red = gltf.scene;
    scene.add(red);
    red.scale.set(5, 5, 5);

    // Set position of the red model
    red.position.set(-50, 1, 0);

    mixerRed = new THREE.AnimationMixer(red);
    gltf.animations.forEach(clip => {
        let actionRed = mixerRed.clipAction(clip);
        actionRed.play();
    });
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

//////BLUE GLOBBY/////////// 
loader.load('assets/BLUE.gltf', function (gltf) {
    blue = gltf.scene;
    scene.add(blue);
    blue.scale.set(40, 40, 40);

    // Set position of the blue model
    blue.position.set(-17, -11, 0);

    mixerBlue = new THREE.AnimationMixer(blue);
    gltf.animations.forEach(clip => {
        let actionBlue = mixerBlue.clipAction(clip);
        actionBlue.play();
    });
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

document.querySelector("header").addEventListener("mousedown", () => {
    console.log("Header mousedown"); // Example interaction, toggle this as needed
});
