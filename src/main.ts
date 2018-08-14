/// <reference path="../typings/index.d.ts" />

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({ antialias: true })

let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshBasicMaterial({ color: 0xff0051 })
let cube = new THREE.Mesh(geometry, material)

//let light = new THREE.AmbientLight("#fff", 0.1)

let scene = new THREE.Scene()

function main() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  camera.position.z = 5
  scene.add(cube)

  animate()
}

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera)
}