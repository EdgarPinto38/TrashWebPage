import * as THREE from 'three'

const canvas = document.querySelector('#bg')
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener(('resize'), () =>{
       sizes.width =  window.innerWidth     
       sizes.height = window.innerHeight
       camera.aspect = sizes.width/sizes.height
       camera.updateProjectionMatrix();
       renderer.setSize(sizes.width,sizes.height)
       renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)

    })

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000)

    const particlesGeometry = new THREE.BufferGeometry()
    const count = 20000;
    const positions= new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random()
    }

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    const particles = new THREE.Points(particlesGeometry,particlesMaterial)
    scene.add(particles)


    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(0,0,8)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height)

    const clock = new THREE.Clock()

    function animate(){
        requestAnimationFrame(animate)
        const elapsedTime = clock.getElapsedTime()
        renderer.render(scene,camera)
    }
    animate();