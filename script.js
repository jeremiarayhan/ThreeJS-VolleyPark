import * as THREE from './three/build/three.module.js'

let scene, cam, renderer
let plane, net, pole1, pole2, ball
let pointLight, ambientLight

let makePointLight = () => {
    return new THREE.PointLight(0xF5E6CA, 1, 1000, 0.7)
}

let makeAmbientLight = () => {
    return new THREE.AmbientLight(0xF5E6CA, 0.3)
}

let makePlane = () => {
    let pGeo = new THREE.PlaneGeometry(500, 500)
    let pText = new THREE.TextureLoader().load('./assets/field.jpg')
    let pMat = new THREE.MeshPhongMaterial({
        map: pText,
        side: THREE.DoubleSide
    })
    return new THREE.Mesh(pGeo,pMat)
}

let makeNet = () => {
    let bGeo = new THREE.BoxGeometry(320, 60, 1)
    let bText = new THREE.TextureLoader().load('./assets/net.jpg')
    let bMat = new THREE.MeshPhongMaterial({
        map: bText
    })
    return new THREE.Mesh(bGeo,bMat)
}

let makePole1 = () => {
    let bGeo = new THREE.BoxGeometry(50,100,20)
    let bMat = new THREE.MeshPhongMaterial({
        color: 0xC0C0C0

    })
    return new THREE.Mesh(bGeo,bMat)
}

let makePole2 = () => {
    let bGeo = new THREE.BoxGeometry(50,100,20)
    let bMat = new THREE.MeshPhongMaterial({
        color: 0xC0C0C0
    })
    return new THREE.Mesh(bGeo,bMat)
}

let makeBall = () => {
    let sGeo = new THREE.SphereGeometry(15,32,32)
    let sMat = new THREE.MeshBasicMaterial({
        color: 0xffff00
    })

    return new THREE.Mesh(sGeo,sMat)
}

function init() {
    scene = new THREE.Scene()

    let fov = 100
    let near = 0.1
    let far = 1000
    let width = window.innerWidth
    let height = window.innerHeight
    let aspect = width/height

    cam = new THREE.PerspectiveCamera(fov, aspect, near, far)
    cam.position.set(0,300,-400)
    cam.lookAt(0,0,0)

    renderer = new THREE.WebGLRenderer({antialias : true})
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.setClearColor(0x39a9cb)

    pointLight = makePointLight()
    pointLight.position.set(-200,150,-400)
    pointLight.castShadow = true

    ambientLight = makeAmbientLight()

    plane = makePlane()
    plane.position.set(0,0,0)
    plane.rotation.set(Math.PI/2,0,-Math.PI/2)
    plane.castShadow = true
    plane.receiveShadow = true

    net = makeNet()
    net.position.set(0,55,-30)
    net.castShadow = true
    net.receiveShadow = true

    pole1 = makePole1()
    pole1.position.set(180,30,-30)
    pole1.castShadow = true
    pole1.receiveShadow = true

    pole2 = makePole2()
    pole2.position.set(-180,30,-30)
    pole2.castShadow = true
    pole2.receiveShadow = true

    ball = makeBall()
    ball.position.set(0,15,-100)
    ball.castShadow = true
    ball.receiveShadow = true

    
    scene.add(plane)
    scene.add(net)
    scene.add(pole1)
    scene.add(pole2)
    scene.add(ball)
    
    scene.add(pointLight)
    scene.add(ambientLight)
    
    document.body.appendChild(renderer.domElement)
}

function rendering(){
    renderer.render(scene, cam)
    requestAnimationFrame(rendering)
}

window.onload = () => {
    init()
    rendering()
}

window.onresize = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
}