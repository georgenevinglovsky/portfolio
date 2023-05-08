import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(20);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
torus.position.z=-40;

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper=new THREE.GridHelper(200,50);
scene.add(lightHelper);
//const controls = new OrbitControls(camera,renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh( geometry, material);
  const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background =spaceTexture;

const georgeTexture = new THREE.TextureLoader().load('squareAvatar.jpg');
const george = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: georgeTexture})
);
george.position.set(-3,0,55);
scene.add(george);


const sphereTexture = new THREE.TextureLoader().load('moon.jpg');
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map:sphereTexture})
);
sphere.position.set(-5,0,40);
scene.add(sphere);


function moveCamera(){
const t = document.body.getBoundingClientRect().top;
sphere.rotation.x+=0.05;
sphere.rotation.y+=0.075;
sphere.rotation.z+=0.05;

george.rotation.y+=0.01;
george.rotation.z+=0.01;

camera.position.z = t* -0.01;
camera.position.x = t* -0.0002;
camera.rotation.y = t* -0.0002;

}
document.body.onscroll=moveCamera;

renderer.render(scene,camera);
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  torus.rotation.x += 0.01;
torus.rotation.y += 0.005;
torus.rotation.z += 0.01;
controls.update();
}

animate();