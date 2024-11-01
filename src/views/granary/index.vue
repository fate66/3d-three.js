<template>
  <div id="webgl"></div>
</template>

<script setup lang="ts">
import { Granary } from './granary/index'
import { RenderCamera } from './granary/renderCamera'
import { Resizer } from './granary/resizer'
import { Renderer } from './granary/renderer'
import { RenderLight } from './granary/renderLight'
import { HelpUtils } from './granary/helpUtils'

initGranary()
function initGranary() {
  const renderer = Renderer.initRender()
  const scene = new THREE.Scene()
  const renderCamera = new RenderCamera(scene, renderer).initPerspectiveCameraAndOrbitControls()

  const renderLight = new RenderLight(scene)
  renderLight.addAmbientLight()
  renderLight.addDirectionalLight()

  const helpUtils = new HelpUtils(scene)
  helpUtils.addAxesHelper()
  helpUtils.addStats()
  Resizer.resizeWindow(renderCamera, renderer)

  new Granary(scene, renderCamera.camera)
  function render() {
    renderer.render(scene, renderCamera.camera)
    renderCamera.update()
    helpUtils.updated()
    requestAnimationFrame(render)
  }

  render()
}
</script>
