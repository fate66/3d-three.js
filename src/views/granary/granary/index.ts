import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class Granary {
  public scene: THREE.Scene
  public camera: THREE.Camera
  public loader = new GLTFLoader()
  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene
    this.camera = camera
    // this.init()
    this.loadGranaryModel()
  }

  public init() {
    const boxGeometry = new THREE.BoxGeometry(100, 100, 100)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.set(0, 0, 0)
    this.scene.add(box)
    // initControls(boxMaterial, this.camera, box, this.scene)
    // initControls(boxGeometry, this.camera, box, this.scene)
  }

  loadGranaryModel() {
    // Load a glTF resource
    this.loader.load(
      // resource URL
      'src/assets/granary/model.gltf',
      gltf => {
        console.log(gltf)
        const model = gltf.scene
        model.position.set(0, 0, 0)
        this.scene.add(model)
      }
    )
  }
}
