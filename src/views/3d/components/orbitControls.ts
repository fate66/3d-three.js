import type { PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createOrbitControls(camera: PerspectiveCamera, renderer: WebGLRenderer) {
  const orbitControls = new OrbitControls(camera, renderer.domElement)
  // controls.enableDamping = true // 阻尼系数
  // orbitControls.tick = () => orbitControls.update()
  orbitControls.addEventListener('change', () => {
    camera.updateProjectionMatrix()
  })

  //controls.update() must be called after any manual changes to the camera's transform
  // camera.position.set(0, 20, 100)
  // orbitControls.update()

  return orbitControls
}

export { createOrbitControls }
