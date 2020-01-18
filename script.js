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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({color:0xF7F7F7});
// 

// scene.add(mesh);

meshX = -10;
for(let i = 0; i < 20; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX += 1;
}


const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

const light2 = new THREE.PointLight(0xFFFFFF, 2, 1000);
light2.position.set(0, 0, 25);
scene.add(light2);

const render = () => {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    console.log(this);

    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5")
    }
}
render();

window.addEventListener('click', onMouseClick);