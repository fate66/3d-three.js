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
camera.position.set(0, 50, 80)
createOrbitControls(camera, renderer)
const texture = new TextureLoader()

const ambientLight = new AmbientLight('white', 1)
scene.add(ambientLight)

function createShaderMaterial() {
  const planeGeometry = new THREE.PlaneGeometry(10, 10)
  // const planeMaterial = new THREE.MeshStandardMaterial({ color: 'grey', map: planeTexture })

  // const planeMaterial = new THREE.MeshStandardMaterial({ color: 'grey' })

  const shaderMaterial = new THREE.ShaderMaterial({
    // 顶点着色器 设定定点坐标，position 是传进来的值
    vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // 片元着色器 设定像素点
    fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }`
  })

  const plane = new THREE.Mesh(planeGeometry, shaderMaterial)
  plane.receiveShadow = true
  plane.position.set(0, 0, 0)
  // plane.rotateX(-Math.PI / 2)
  scene.add(plane)
}

createShaderMaterial()

console.log('scene', scene)

const clock = new Clock()

render()
function render() {
  let time = clock.getElapsedTime()

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
