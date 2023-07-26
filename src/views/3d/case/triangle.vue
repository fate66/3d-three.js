<template>
  <div id="webgl"></div>
</template>

<script setup lang="ts">
// import * as three from 'three'
import { onMounted } from 'vue'
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera
} from 'three'
import useScence from './hooks/useScence'
import { createCube } from '@/views/3d/components/cube.ts'
import { createOrbitControls } from '@/views/3d/components/orbitControls'
import { createLights } from '@/views/3d/components/light'
import {
  createTriangle,
  createPattern,
  createMinecraft,
  createAlpha,
  createambientOcclusion,
  createStand,
  createRoughness,
  createRormal,
  createEnvMap
} from './hooks/triangle'
const { scene, renderer } = useScence()

const camera: PerspectiveCamera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
// const cube: Object3D = createCube()
scene.add(camera)

createOrbitControls(camera, renderer)

const ambientLight = new AmbientLight('white', 3)
scene.add(ambientLight)

console.log('scene', scene)
// 科技三角形
// scene.add(...createTriangle())
// 门纹理
// const cube = createPattern()
// 纹理算法，主要用于控制纹理如何显示
// const cube = createMinecraft()
// 透明纹理 控制纹理某些部位显隐
// const cube = createAlpha()
// 环境遮挡贴图,主要用于给环境添加遮挡
// const cube = createambientOcclusion()

// 贴图，让纹理看起来有高度
// const cube = createStand()
// 粗糙度贴的图，让图片某部分看起来更加粗糙
// const cube = createRoughness()

// 涉及所有贴图
// const cube = createRormal()

// 场景贴图，贴多个面
const [sphere, envMap] = createEnvMap()
// 只给环境贴图
scene.background = envMap
// 默认给所有未贴环境图的物体添加环境图
scene.environment = envMap

scene.add(sphere)

const directionalLight = new DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(-1, 2, 30)
// directionalLight.target = sphere
scene.add(directionalLight)
const helper = new DirectionalLightHelper(directionalLight, 5)
scene.add(helper)

render()
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
