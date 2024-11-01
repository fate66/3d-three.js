import * as THREE from 'three'

export class RenderLight {
  scene: THREE.Scene
  constructor(scene: THREE.Scene) {
    this.scene = scene
  }
  addAmbientLight() {
    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    // gui.add(ambientLight)
    this.scene.add(ambientLight)
  }

  addDirectionalLight() {
    const directionLight = new THREE.DirectionalLight(0xffffff, 3)
    directionLight.position.set(200, 100, 20)

    // // 调整阴影贴图分辨率
    // directionLight.shadow.mapSize.width = 2048 // default
    // directionLight.shadow.mapSize.height = 2048 // default
    // directionLight.shadow.camera.near = 0.5 // default
    // directionLight.shadow.camera.far = 5000 // default

    // // 调整阴影相机的参数
    // directionLight.shadow.camera.left = -150
    // directionLight.shadow.camera.right = 150
    // directionLight.shadow.camera.top = 70
    // directionLight.shadow.camera.bottom = -70
    // directionLight.shadow.camera.near = 0.5
    // directionLight.shadow.camera.far = 400

    // const helper = new THREE.DirectionalLightHelper(directionLight, 50)
    // scene.add(helper)

    // directionLight.castShadow = true

    // 可视化平行光阴影对应的正投影相机对象
    // const cameraHelper = new THREE.CameraHelper(camera)
    // scene.add(cameraHelper)

    this.scene.add(directionLight)
  }
}
