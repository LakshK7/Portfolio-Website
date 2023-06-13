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

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 16),
  new THREE.MeshPhongMaterial({
    map: earthtexture,
    normalMap: new THREE.TextureLoader().load("bump.jpeg"),
    // bumpScale: 0.05,
    specularMap: new THREE.TextureLoader().load("water_4k.png"),
    specular: new THREE.Color("grey"),
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

scene.add(sphere);
// scene.add(sphere11);

const pointLight = new THREE.PointLight(0xffffff);
const ambLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(100, 100, 30);

scene.add(ambLight);

const gridhelper = new THREE.GridHelper(200, 50);

// scene.add(gridhelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStars);

const space = new THREE.TextureLoader().load("space1.jpeg");
scene.background = space;

function moveCamera() {
  const pos = document.body.getBoundingClientRect().top;

  camera.position.x = pos * -0.003;
  camera.position.y = pos * -0.01;
  // camera.position.z = pos * 0.001;
}

document.body.onscroll = moveCamera;

function animation() {
  requestAnimationFrame(animation);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  // sphere.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animation();
