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
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  SphereGeometry,
  SpotLight,
  TextureLoader
} from 'three'
import useScence from './hooks/useScence'
import { createCube } from '@/views/3d/components/cube.ts'
import { createOrbitControls } from '@/views/3d/components/orbitControls'
import { createLights } from '@/views/3d/components/light'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const { scene, renderer } = useScence()
const gui = new GUI()
const dirFolder = gui.addFolder('平面')
dirFolder.close() //关闭菜单

const camera: PerspectiveCamera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
// const cube: Object3D = createCube()
scene.add(camera)

createOrbitControls(camera, renderer)

const ambientLight = new AmbientLight('white', 0.5)
scene.add(ambientLight)

console.log('scene', scene)

// 平行光的阴影设置
// const directionalLight = new DirectionalLight(0xffffff, 3)
// directionalLight.position.set(10, 10, 10)
// directionalLight.castShadow = true
// // directionalLight.target = sphere
// // 以下主要是设置阴影边缘模糊度
// directionalLight.shadow.radius = 20 // 模糊阴影边缘
// directionalLight.shadow.mapSize.width = 4096 // 设置阴影模糊的效果
// directionalLight.shadow.mapSize.height = 4096
// directionalLight.shadow.camera.near = 0.5 // default
// directionalLight.shadow.camera.far = 500 // default

// scene.add(directionalLight)
// const helper = new DirectionalLightHelper(directionalLight, 5)
// scene.add(helper)

// 聚光灯从一个点发出，经过纹理调节形成阴影
const spotLight = new SpotLight(0xffffff, 3)
spotLight.position.set(10, 10, 10)
spotLight.distance = 0
// spotLight.map = new TextureLoader().load(url)
spotLight.shadow.radius = 20 // 模糊阴影边缘
spotLight.castShadow = true
spotLight.penumbra = 2

spotLight.shadow.mapSize.width = 8000
spotLight.shadow.mapSize.height = 8000

// spotLight.shadow.camera.near = 500
// spotLight.shadow.camera.far = 4000
// spotLight.shadow.camera.fov = 30

scene.add(spotLight)

const geometry = new SphereGeometry(1, 32, 32)
const material = new MeshStandardMaterial({ roughness: 0.1, metalness: 0.8 })
const sphere = new Mesh(geometry, material)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

spotLight.target = sphere

const planeGeometry = new PlaneGeometry(5, 5)
const planeMaterial = new MeshStandardMaterial({ side: DoubleSide })
const plane = new Mesh(planeGeometry, planeMaterial)
plane.position.set(0, -1, 0)
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)
dirFolder.add(plane.position, 'z', 0, -5)

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
