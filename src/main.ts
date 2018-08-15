/// <reference path="../typings/index.d.ts" />

class Main {
  private camera: THREE.Camera
  private renderer: THREE.Renderer
  private cube: THREE.Mesh
  private scene: THREE.Scene

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0xff0051 })
    this.cube = new THREE.Mesh(geometry, material)

    //let light = new THREE.AmbientLight("#fff", 0.1)

    this.scene = new THREE.Scene()
  }

  start() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.camera.position.z = 5
    this.scene.add(this.cube)

    this.animate()
  }

  private animate() {
    requestAnimationFrame(() => { this.animate() })

    this.cube.rotation.x += 0.03;
    this.cube.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera)
  }
}

function main() {
  new Main().start()
}