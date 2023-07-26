import { Scene, type PerspectiveCamera, type WebGLRenderer } from 'three'
// 屏幕控制
const setSize = (dom: any, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  camera.aspect = dom.clientWidth / dom.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(dom.clientWidth, dom.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

const fullScreen = (ev: MouseEvent): void => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
const resizeWindow = (dom: any, scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer): void => {
  setSize(dom, camera, renderer)
  render(scene, camera, renderer)
  window.addEventListener('resize', () => {
    // set the size again if a resize occurs
    setSize(dom, camera, renderer)
    render(scene, camera, renderer)
  })
  // 进入全屏
  window.addEventListener('dblclick', fullScreen)
}
function render(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer): void {
  renderer.render(scene, camera)
}

export { resizeWindow, render }
