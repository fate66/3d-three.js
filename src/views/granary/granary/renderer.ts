export class Renderer {
  static initRender() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor(new THREE.Color(0x000000), 1)
    renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace

    onMounted(() => {
      const dom = document.querySelector('#webgl')
      dom?.appendChild(renderer.domElement)
    })
    return renderer
  }
}
