// Import Three.js
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

///////CREATE SCENE //////////////////
let scene, camera, renderer, green, orange, red, blue, glob, globone, clock;
let sceneContainer = document.querySelector("#scene-container");
let mixerGreen, mixerOrange, mixerRed, mixerBlue, mixerGlob, mixerGlobone; // Separate mixers for each animated object

// Audio variables
let listener, sound, audioLoader;

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
    lightRight.position.set(0, 50, 30);
    scene.add(lightRight);

    const lightLeft = new THREE.DirectionalLight(0xffffff, 3);
    lightLeft.position.set(50, 0, 20);
    scene.add(lightLeft);

    camera.position.z = 50;

    // Audio setup
    listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    audioLoader = new THREE.AudioLoader();

    const controls = new OrbitControls(camera, renderer.domElement);

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
    if (mixerGlobone) mixerGlobone.update(delta);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();

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

//////////TILESOUND/////////////////
        audioLoader.load('assets/GLOBBY!.mp3', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });
    
        // Add event listener to the model for click interaction
        renderer.domElement.addEventListener('click', function(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Raycaster for detecting clicks on the model
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
    
            // Check if the ray intersects the glob model
            const intersects = raycaster.intersectObject(glob, true);
            if (intersects.length > 0) {
                sound.play();
            }
        });
    
    }, undefined, function (error) {
        console.error('An error happened while loading the model:', error);
    });




/////////////////////
    ///////////NUMBERS/////////
    /////1/////////// 
 
loader.load('assets/ONE.gltf', function (gltf) {
    globone = gltf.scene;
    scene.add(globone);
    globone.scale.set(200, 200, 200);

    // Set position of the glob model
    globone.position.set(100, 0, 0);

    mixerGlobone = new THREE.AnimationMixer(globone);
    gltf.animations.forEach(clip => {
        let actionGlobone = mixerGlobone.clipAction(clip);
        actionGlobone.play();
    });


    //////////SOUND/////////////////
    audioLoader.load('assets/1.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
    });

    // Add event listener to the model for click interaction
    renderer.domElement.addEventListener('click', function(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Raycaster for detecting clicks on the model
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // Check if the ray intersects the glob model
        const intersects = raycaster.intersectObject(globone, true);
        if (intersects.length > 0) {
            sound.play();
        }
    });





    
    }, undefined, function (error) {
        console.error('An error happened while loading the model:', error);
    });



    ////////////////////////////////////////////////////////













    
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
   
        audioLoader.load('assets/GREEN.mp3', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });
    
        // Add event listener to the model for click interaction
        renderer.domElement.addEventListener('click', function(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Raycaster for detecting clicks on the model
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
    
            // Check if the ray intersects the glob model
            const intersects = raycaster.intersectObject(green, true);
            if (intersects.length > 0) {
                sound.play();
            }
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
   
        
        audioLoader.load('assets/HIGLOBBY2.mp3', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });
    
        // Add event listener to the model for click interaction
        renderer.domElement.addEventListener('click', function(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Raycaster for detecting clicks on the model
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
    
            // Check if the ray intersects the glob model
            const intersects = raycaster.intersectObject(orange, true);
            if (intersects.length > 0) {
                sound.play();
            }
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
    
        
        audioLoader.load('assets/RED.mp3', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });
    
        // Add event listener to the model for click interaction
        renderer.domElement.addEventListener('click', function(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Raycaster for detecting clicks on the model
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
    
            // Check if the ray intersects the glob model
            const intersects = raycaster.intersectObject(red, true);
            if (intersects.length > 0) {
                sound.play();
            }
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
    
        
        audioLoader.load('assets/BLUE.mp3', function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
        });
    
        // Add event listener to the model for click interaction
        renderer.domElement.addEventListener('click', function(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            // Raycaster for detecting clicks on the model
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
    
            // Check if the ray intersects the glob model
            const intersects = raycaster.intersectObject(blue, true);
            if (intersects.length > 0) {
                sound.play();
            }
        });
    
    }, undefined, function (error) {
        console.error('An error happened while loading the model:', error);
    });






    
    document.querySelector("header").addEventListener("mousedown", () => {
        console.log("Header mousedown"); // Example interaction, toggle this as needed
    });
    
    init(); // execute initialize function
    animate(); // execute animation function
    