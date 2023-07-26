// 线几何体
<template>
  <div id="webgl"></div>
</template>

<script setup>
import { nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import geomentry from './geomentry'

// 设为线材质 实线
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000 //线条颜色
})
// 设为线材质 虚线
// const lineMaterial = new THREE.LineDashedMaterial({
//   color: 0xff0000 //线条颜色
// })

// 设置线模型
// const line = new THREE.Line(geomentry, lineMaterial)

// 设置线模型 一条头尾相接的连续线
// const line = new THREE.LineLoop(geomentry, lineMaterial)

// 在若干对的顶点之间绘制的一系列的线。 与 Line 几乎相同
const line = new THREE.LineSegments(geomentry.pointGeometry(), lineMaterial)

line.position.set(0, 0, 0)

const scene = new THREE.Scene({ background: '#fffff' })

scene.add(line)

// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(200, 200, 200)
// camera.lookAt(line.position)
scene.add(camera)

// 坐标系
const axesHelper = new THREE.AxesHelper(100)
// scene.add(axesHelper)

// 光源
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(400, 200, 300)
console.log(pointLight)

scene.add(pointLight)

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
  // line.rotateZ(0.01)
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
