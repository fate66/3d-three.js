<template>
  <div id="webgl"></div>
</template>

<script setup lang="ts">
// import * as three from 'three'
import { onMounted } from 'vue'
import {
  AmbientLight,
  BoxGeometry,
  Clock,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
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
// 发光的星星，利用点光源
const camera: PerspectiveCamera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

createOrbitControls(camera, renderer)

const ambientLight = new AmbientLight('white', 0.5)
scene.add(ambientLight)

console.log('scene', scene)

const light = new PointLight('red', 8, 3)
light.position.set(0, 0, 0)

light.distance = 10
light.shadow.radius = 20
light.castShadow = true
// light.power = 800

light.shadow.mapSize.width = 8000
light.shadow.mapSize.height = 8000

const geometry = new SphereGeometry(0.1, 32, 32)
const material = new MeshBasicMaterial({ color: 'red' })
const sphere = new Mesh(geometry, material)
sphere.position.set(2, 1, 2)
sphere.castShadow = true
sphere.receiveShadow = true
sphere.add(light)

scene.add(sphere)

const planeGeometry = new PlaneGeometry(5, 5)
const planeMaterial = new MeshStandardMaterial({ side: DoubleSide })
const plane = new Mesh(planeGeometry, planeMaterial)
plane.position.set(0, -1, 0)
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)
dirFolder.add(plane.position, 'z', 0, -5)
const clock = new Clock()
render()
function render() {
  let time = clock.getElapsedTime()
  renderer.render(scene, camera)
  sphere.position.x = Math.sin(time) * 2
  sphere.position.z = Math.cos(time) * 2
  sphere.position.y = Math.sin(time) + 1

  requestAnimationFrame(render)
}
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
