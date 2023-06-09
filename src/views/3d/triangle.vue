// 自定义三角形--面
<template>
  <div id="webgl"></div>
</template>

<script setup>
import { nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import geomentry from './geomentry'

// 材质，
const meshMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  flatShading: true,
  side: THREE.DoubleSide
})
// 几何体（三角形） + 材质 = 模型
const face = new THREE.Mesh(geomentry.pointGeometry(), meshMaterial)
face.position.set(0, 0, 0)

const scene = new THREE.Scene()
scene.background = new THREE.Color('#7d7b7b')

// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(200, 200, 200)
// camera.lookAt(face.position)
scene.add(camera)

scene.add(face)

// 坐标系
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

// 光源
const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
scene.add(light)

// scene.add(pointLight)

// 渲染
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)
render.render(scene, camera) //执行渲染操作

// fps
const stats = new Stats()

nextTick(() => {
  document.getElementById('webgl').appendChild(render.domElement)
  document.body.appendChild(stats.domElement)
})

// 动画

function renderAnimation() {
  // face.rotateZ(0.01)
  render.render(scene, camera) //执行渲染操作
  stats.update() // 刷新时间
  requestAnimationFrame(renderAnimation)
}

renderAnimation()

// 相机控制器
const controls = new OrbitControls(camera, render.domElement)
controls.addEventListener('change', () => {
  console.log(camera.position)
  // render.render(scene, camera) //执行渲染操作
})

window.onresize = function () {
  render.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
</script>
