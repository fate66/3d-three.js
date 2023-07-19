const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(dom, camera, renderer) {
    camera.aspect = dom.clientWidth / dom.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(dom.clientWidth, dom.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    setSize(dom, camera, renderer)
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(dom, camera, renderer)
      this.onResize()
    })
  }
  onResize() {}
}

export { Resizer }
