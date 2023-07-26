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

// 几何体
const geometry = new THREE.BoxGeometry(50, 50, 50)

// MeshBasicMaterial 不受光照影响
// MeshLambertMaterial 漫反射材质，受光照影响

// 材质
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 })

// 物体
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 60, 0)

// gui用法 分组
const matFolder = gui.addFolder('物体坐标')
matFolder.close()
matFolder.add(mesh.position, 'x', 0, 180).name('mesh物体x坐标')

matFolder.add(mesh.position, 'y', 0, 180).name('mesh物体y坐标')
matFolder.add(mesh.position, 'z', 0, 180).name('mesh物体z坐标')
const obj = {
  scale: 0
}
matFolder
  .add(obj, 'scale', [-100, 0, 100])
  .name('mesh-y坐标')
  .onChange(function (value) {
    mesh.position.y = value
  })

const materialFolder = gui.addFolder('材质')
materialFolder
  .addColor(material, 'color')
  .name('材质颜色')
  .onChange(function (value) {
    mesh.material.color.set(value)
  })
materialFolder.close()

scene.add(mesh)

// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(200, 200, 200)
camera.lookAt(mesh.position)
scene.add(camera)

// 坐标系
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// 光源
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(400, 200, 300)
gui.add(pointLight, 'intensity', 0, 3000).name('点光源强度').step(1)
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
  mesh.rotateZ(0.01)
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
