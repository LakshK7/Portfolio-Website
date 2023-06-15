import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const earthtexture = new THREE.TextureLoader().load("earth.jpeg");
const mountains = new THREE.TextureLoader().load("bump.jpeg");
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 16),
  new THREE.MeshStandardMaterial({
    map: earthtexture,
    normalMap: mountains,
    // // bumpScale: 0.05,
    // specularMap: new THREE.TextureLoader().load("water_4k.png"),
    // specular: new THREE.Color("grey"),
  })
);
// sphere.scale(0.5, 0.5);

// const sphere11 = new THREE.Mesh(
//   new THREE.SphereGeometry(10.03, 32, 32),
//   new THREE.MeshPhongMaterial({
//     map: THREE.ImageUtils.loadTexture("fair_clouds.jpeg"),
//     transparent: true,
//   })
// );

const moonObj = new THREE.Object3D();

const moontextture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 16),
  new THREE.MeshStandardMaterial({
    map: moontextture,
    normalMap: normalTexture,
  })
);

moonObj.add(moon);
moon.position.x = 35;
scene.add(sphere, moonObj);
// scene.add(sphere11);

const pointLight = new THREE.PointLight(0xffffff);
const ambLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(100, 100, 30);

scene.add(ambLight);
// scene.add(pointLight);

const gridhelper = new THREE.GridHelper(200, 50);

// scene.add(gridhelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStars);

const space = new THREE.TextureLoader().load("./space1.jpeg");
scene.background = space;

function moveCamera() {
  const pos = document.body.getBoundingClientRect().top;

  camera.position.x = pos * -0.008;
  camera.position.y = pos * -0.03;
  // camera.position.z = pos * 0.001;
}

document.body.onscroll = moveCamera;

function animation() {
  requestAnimationFrame(animation);

  // sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  // sphere.rotation.z += 0.01;
  moonObj.rotation.y += 0.001;
  moon.rotation.y += 0.001;
  controls.update();

  renderer.render(scene, camera);
}

animation();
