import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer()
  // 抗锯齿
  renderer.physicallyCorrectLights = true

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })
  return renderer
}

export { createRenderer }
