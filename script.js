const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({color:0xFFCC00});
const mesh = new THREE.Mesh(geometry, material);


scene.add(mesh);

const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(10, 0, 25);
scene.add(light);

const render = () => {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}
render();

this.tl = new TimelineMax({paused: true});
this.tl.to(mesh.scale, 1, {x: 2, ease: Expo.easeOut})
this.tl.to(mesh.scale, .5, {x: .5, ease: Expo.easeOut})
this.tl.to(mesh.position, .5, {x: 2, ease: Expo.easeOut})
this.tl.to(mesh.rotation, .5, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5")