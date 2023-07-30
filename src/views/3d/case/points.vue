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
  NearestFilter,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  RepeatWrapping,
  SphereGeometry,
  SpotLight,
  TextureLoader
} from 'three'
import useScence from './hooks/useScence'
import { createCube } from '@/views/3d/components/cube.ts'
import { createOrbitControls } from '@/views/3d/components/orbitControls'
import { createLights } from '@/views/3d/components/light'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import snow from '@/image/textures/points/snow.png'
import * as THREE from 'three'
import snowBg from '@/image/textures/points/bg.jpg'
import snowBg3 from '@/image/textures/points/bg2.jpg'
import snowBg4 from '@/image/textures/points/bg4.jpeg'
import { resizeWindow } from '@/views/3d/components/Resizer'

// 点
const { scene, renderer } = useScence()
const camera: PerspectiveCamera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
createOrbitControls(camera, renderer)
const texture = new TextureLoader()

const ambientLight = new AmbientLight('white', 1)
scene.add(ambientLight)

console.log('scene', scene)

const clock = new Clock()

const geometry = new SphereGeometry(1, 30, 30)
// const material = new MeshBasicMaterial({})

const material = new PointsMaterial({ size: 0.1, transparent: true })
// material.sizeAttenuation = false

// const sphere = new Mesh(geometry, material)

const sphere = new Points(geometry, material)
sphere.position.set(-4, 0, 0)
scene.add(sphere)

const count = 5000

const geometry2 = new THREE.BufferGeometry()
const list = []
const colors = []
for (let i = 0; i < count * 3; i++) {
  list.push(Math.random() * 5)
  colors.push(Math.random())
}
geometry2.setAttribute('position', new THREE.Float32BufferAttribute(list, 3))
geometry2.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

const material2 = new THREE.PointsMaterial({ color: 'white', size: 0.1 })
material2.vertexColors = true

const snow2 = texture.load(snow)
snow2.magFilter = NearestFilter
snow2.minFilter = NearestFilter
material2.map = snow2
// material2.alphaTest = 1
// const snowBg2 = texture.load(snowBg4)
// scene.background = snowBg2

const points = new THREE.Points(geometry2, material2)
points.position.set(-1, -2, 6)
scene.add(points)

// resizeWindow(window, scene, camera, renderer)

render()
function render() {
  let time = clock.getElapsedTime()
  points.translateY(-time * 0.00007)
  if (points.position.y < -3) {
    points.position.y = 0
  }
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
