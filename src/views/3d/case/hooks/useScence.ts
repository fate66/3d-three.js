import { ref, computed, onBeforeUnmount, reactive, onMounted } from 'vue'
import { AxesHelper, Scene, Color, WebGLRenderer, PerspectiveCamera, sRGBEncoding, SRGBColorSpace } from 'three'
import { createRenderer } from '@/views/3d/components/renderer'
import { resizeWindow } from '@/views/3d/components/Resizer'
function useScence(): any {
  // 场景
  const scene: Scene = new Scene()
  const axesHelper: AxesHelper = new AxesHelper(5)
  scene.add(axesHelper)
  // 渲染
  const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.localClippingEnabled = true
  renderer.shadowMap.enabled = true

  // 更准确的颜色
  renderer.outputColorSpace = SRGBColorSpace
  // 是否使用物理上正确的光照模式
  // renderer.physicallyCorrectLights = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  onMounted(() => {
    let container: Element | null = document.querySelector('#webgl')
    // cameras.position.set(0, 0, 50)
    container?.appendChild(renderer.domElement)
  })
  return { scene, renderer }
}

export default useScence
