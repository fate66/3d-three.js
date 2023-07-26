import { WebGLRenderer, sRGBEncoding } from 'three'

function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer()
  // renderer.localClippingEnabled = true
  // renderer.shadowMap.enabled = true
  // 更准确的颜色
  // renderer.outputEncoding = sRGBEncoding
  // 是否使用物理上正确的光照模式
  // renderer.physicallyCorrectLights = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

export { createRenderer }
