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
  MirroredRepeatWrapping,
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
import ball1 from '@/image/textures/ball/1.png'
import ballbg from '@/image/textures/ball/bg.jpg'
import * as CANNON from 'cannon-es'

// 点
const { scene, renderer } = useScence()
const camera: PerspectiveCamera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, -3, 50)
// createOrbitControls(camera, renderer)
const texture = new TextureLoader()

const ambientLight = new AmbientLight('white', 1)
scene.add(ambientLight)

const light = new THREE.PointLight('white', 3, 100)
light.position.set(3, 5, 0)
scene.add(light)

const ballTexture = texture.load(ball1)
const geometry = new THREE.SphereGeometry(1, 100, 100)
const material = new THREE.MeshStandardMaterial({ metalness: 0.8, roughness: 0, map: ballTexture })
const sphere = new THREE.Mesh(geometry, material)
sphere.castShadow = true
sphere.position.set(0, 3, -9)
scene.add(sphere)

const planeTexture = texture.load(ballbg)
planeTexture.wrapS = RepeatWrapping
planeTexture.wrapT = RepeatWrapping // 镜像重复，翻转
planeTexture.repeat.set(10, 10)
// planeTexture.anisotropy = 4
const planeGeometry = new THREE.PlaneGeometry(100, 100)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 'grey', map: planeTexture })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.position.set(0, -10, -2)
plane.rotateX(-Math.PI / 2)
scene.add(plane)

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0) // m/s²
})

const sphereMaterial = new CANNON.Material('sphere')
const radius = 0.5 // m
const sphereBody = new CANNON.Body({
  mass: 25, // kg
  shape: new CANNON.Sphere(radius),
  material: sphereMaterial
})
sphereBody.position.set(sphere.position.x, sphere.position.y, sphere.position.z) // m
world.addBody(sphereBody)

const wordPlaneMaterial = new CANNON.Material('plan')

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: wordPlaneMaterial
})
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
groundBody.position.set(plane.position.x, plane.position.y, plane.position.z)
world.addBody(groundBody)

const wordMaterial = new CANNON.ContactMaterial(sphereMaterial, wordPlaneMaterial, {
  friction: 0.1, //摩擦力
  restitution: 0.9 // 弹性
})
world.addContactMaterial(wordMaterial)

console.log('scene', scene)

const clock = new Clock()

render()
function render() {
  let time = clock.getElapsedTime()

  world.fixedStep()
  sphere.position.setY(sphereBody.position.y)
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
