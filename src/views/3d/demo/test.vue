<template>
  <div id="webgl"></div>
</template>

<script setup>
import { nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

import Stats from 'three/addons/libs/stats.module.js'

// 启动gui
const gui = new GUI()

const scene = new THREE.Scene()
scene.background = new THREE.Color('yellow')
const material = new THREE.LineBasicMaterial({
  color: 0x0000ff
})

const points = []
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, 10, 0))
points.push(new THREE.Vector3(10, 0, 0))

const geometry = new THREE.BufferGeometry().setFromPoints(points)

const line = new THREE.Line(geometry, material)
scene.add(line)
// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.set(200, 200, 200)
// // camera.lookAt(mesh.position)
scene.add(camera)

// 坐标系
// const axesHelper = new THREE.AxesHelper(50)
// scene.add(axesHelper)

// 光源
const light = new THREE.AmbientLight(0x404040) // 柔和的白光

scene.add(light)

// 渲染
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)
render.render(scene, camera) //执行渲染操作

// fps
// const stats = new Stats()

nextTick(() => {
  document.getElementById('webgl').appendChild(render.domElement)
  // document.body.appendChild(stats.domElement)
})

// 动画

function renderAnimation() {
  render.render(scene, camera) //执行渲染操作
  // stats.update() // 刷新时间
  requestAnimationFrame(renderAnimation)
}

renderAnimation()

// 相机控制器
// const controls = new OrbitControls(camera, render.domElement)
// controls.addEventListener('change', () => {
//   console.log(camera.position)
//   // render.render(scene, camera) //执行渲染操作
// })

window.onresize = function () {
  render.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
</script>
