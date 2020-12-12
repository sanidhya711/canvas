import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js';
import { OrbitControls } from "https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
renderer.setClearColor(0x000000,0); 

//lights
const directionalLight = new THREE.DirectionalLight(0xffffff,0.9);
directionalLight.position.set(7,2,7);
scene.add( directionalLight );

const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.9);
directionalLight2.position.set(-7,2,-7);
scene.add( directionalLight2 );

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
camera.position.set(25,0,0);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera,renderer.domElement);
controls.autoRotate=true;
controls.autoRotateSpeed=5;
controls.maxDistance = 20;
controls.minDistance = 11;

const loader = new THREE.TextureLoader();
var bumpMap = loader.load("bump map.png");

loader.load("osho.jpg",function(texture){
    const geometry = new THREE.BoxGeometry(13.6,18.1,0.8);
    var cubeMaterialArray = [];
    cubeMaterialArray.push( new THREE.MeshBasicMaterial({color:0xF3F2DA}));
    cubeMaterialArray.push( new THREE.MeshBasicMaterial({color:0xF3F2DA}));
    cubeMaterialArray.push( new THREE.MeshBasicMaterial({color:0xF3F2DA}));
    cubeMaterialArray.push( new THREE.MeshBasicMaterial({color:0xF3F2DA}));
    cubeMaterialArray.push( new THREE.MeshPhongMaterial({map:texture,bumpMap:bumpMap,bumpScale:0.12}));
    cubeMaterialArray.push( new THREE.MeshPhongMaterial({map:texture,bumpMap:bumpMap,bumpScale:0.12}));
    const material = new THREE.MeshFaceMaterial(cubeMaterialArray);
    const cube = new THREE.Mesh(geometry,material);
    cube.rotation.y=10;
    scene.add(cube);
    renderer.render(scene,camera);
});

function update(){
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(update);
}

update();


