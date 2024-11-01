<template>
  <div id="webgl"></div>
</template>

<script setup>
// 飞机
import { nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Timer } from 'three/addons/misc/Timer.js'

import geomentry from './geomentry.js'

const timer = new Timer()
let delta
let r = 60
let flyModel
const scene = new THREE.Scene()
scene.background = new THREE.Color('#7d7b7b')

// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(80, 130, 80)
// camera.lookAt(rect.position)
scene.add(camera)

// 坐标系
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

// 环境光
const ambientLight = new THREE.AmbientLight(0x404040) // 柔和的白光
scene.add(ambientLight)

// 从上方照射的白色平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 100, 100)
scene.add(directionalLight)

// 光源
// const pointLight = new THREE.PointLight(0xffffff, 1)
// pointLight.position.set(400, 200, 300)
// console.log(pointLight)

// scene.add(pointLight)

// fps
const stats = new Stats()

const loader = new GLTFLoader()

const geometry = new THREE.CircleGeometry(r, 64)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
const circle = new THREE.Mesh(geometry, material)
circle.position.set(0, 0.1, 0)
circle.rotation.x = Math.PI / 2
scene.add(circle)
let qStatu, flyV3

// Load a glTF resource
loader.load(
  // resource URL
  'src/assets/无人机.glb',
  // called when the resource is loaded
  function (gltf) {
    console.log(gltf)
    flyModel = gltf.scene
    flyModel.scale.set(0.5, 0.5, 0.5)
    flyModel.position.set(r, 0, 0)
    qStatu = flyModel.quaternion.clone()
    flyV3 = new THREE.Vector3(0, 0, 1)
    const arrowHelper = new THREE.ArrowHelper(flyV3, new THREE.Vector3(0, 0, 0), 50, new THREE.Color('#000000'))
    flyModel.add(arrowHelper)
    scene.add(flyModel)
  }
)

// 渲染
const render = new THREE.WebGLRenderer({ antialias: true })
render.setSize(window.innerWidth, window.innerHeight)
render.render(scene, camera) //执行渲染操作

nextTick(() => {
  document.getElementById('webgl').appendChild(render.domElement)
  document.body.appendChild(stats.domElement)
})

// 动画
let deg = 0.1
function renderAnimation(timestamp) {
  timer.update(timestamp)
  delta = timer.getDelta()
  if (flyModel) flyXY()
  render.render(scene, camera) //执行渲染操作
  stats.update() // 刷新时间
  requestAnimationFrame(renderAnimation)
}

function flyXY() {
  deg -= 0.01
  if (deg < -Math.PI * 2) {
    deg = 0
  }
  const z = r * Math.sin(deg)
  const x = r * Math.cos(deg)
  const v0 = new THREE.Vector3(x, 0, z)
  flyModel.position.copy(v0)
  // 朝向中心点
  // flyModel.rotation.y = -Math.PI / 2 - deg
  // const v3 = new THREE.Vector3(0, 0, 0)
  // const q = new THREE.Quaternion().setFromUnitVectors(flyV3, v3.clone().sub(v0).normalize())
  // flyModel.quaternion.copy(qStatu.clone().multiply(q))

  // 朝向切线方向
  const next = new THREE.Vector3(r * Math.cos(deg - 0.001), 0, r * Math.sin(deg - 0.001))
  const a = next.clone().sub(v0).normalize()
  // const a = new THREE.Vector3(next.x - x, 0, next.z - z).normalize()

  const q = new THREE.Quaternion().setFromUnitVectors(flyV3, a)
  flyModel.quaternion.copy(qStatu.clone().multiply(q))
}

renderAnimation()

// 相机控制器
const controls = new OrbitControls(camera, render.domElement)
controls.addEventListener('change', () => {
  // console.log(camera.position)
  // render.render(scene, camera) //执行渲染操作
})

window.onresize = function () {
  render.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
</script>
