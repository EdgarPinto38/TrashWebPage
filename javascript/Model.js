import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';


    const canvas = document.querySelector('#bg');
    const container = document.querySelector('#container')
    const scene = new THREE.Scene();

    const sizes = {
        width: container.clientWidth,
        height: container.clientHeight
    }

    window.addEventListener('resize', () => {
        sizes.width = container.clientWidth;
        sizes.height = container.clientHeight;
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
        renderer.setSize(sizes.width, sizes.height);
    })

    let  Racoon;

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        'models/Racoon.gltf',
        (gltf) =>{
            const model = gltf.scene
            scene.add(gltf.scene)
            gltf.scene.scale.set(2,2,2)
            gltf.scene.position.set(0, -1, 0)
            Racoon = model.getObjectByName('Racoon');
        }
    )

    const fontLoader = new FontLoader();
    fontLoader.load('fonts/Bebas Neue_Regular.json',(font) => {
        const textGeometry = new TextGeometry(
            'Trash Gamez',{
                font: font,
                size:2,
                height: 0.2,
                curveSegments: 1,
            }
        );
        textGeometry.center();
        const Material = new THREE.MeshBasicMaterial({color:0x000000})
        const text = new THREE.Mesh(textGeometry, Material);
        text.position.set(0,2,0)
        scene.add(text)
    });

    const count = 2000;
    const positions = new Float32Array(count * 3)
    const particleGeometry = new THREE.BufferGeometry()
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30
        positions[i * 3 + 1] =  (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random()-1) * 10
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    const particlesMaterial = new THREE.PointsMaterial({
        color: '#cc1458',
        transparent:true,
        depthWrite:false,
        sizeAttenuation: true,
        size: 5,
        blending:THREE.AdditiveBlending
    })
    const particles = new THREE.Points(particleGeometry,particlesMaterial)
    scene.add(particles)

    const ambientLight = new THREE.DirectionalLight(0xffffff, 2.4);
    const ambientLight2 = new THREE.DirectionalLight(0xffffff, 2.4)
    ambientLight.position.set(2, 2, 0)
    ambientLight2.position.set(-2,2,0)
    scene.add(ambientLight,ambientLight2)

    const aspectRatio =  sizes.width/sizes.height;
    const camera = new THREE.OrthographicCamera(-4 * aspectRatio,4 * aspectRatio,4 ,-4 ,0.1 ,100 ); 
    camera.position.set(0,0,20)
    scene.add(camera);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha:true })

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false
    controls.enableRotate = true;
    controls.maxPolarAngle = 2;
    controls.minPolarAngle = 0.8;
    controls.maxAzimuthAngle = 0.8;
    controls.minAzimuthAngle = -0.8;
    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime()
        controls.update();

        if(Racoon){
            Racoon.rotation.y = elapsedTime * 0.2;
        }

        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
    animate();