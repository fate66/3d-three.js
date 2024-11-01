<template>
  <div id="webgl"></div>
</template>

<script setup>
// import * as three from 'three'
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let renderer, scene, camera

function base() {
  scene = new THREE.Scene()
  scene.background = '0x000000'
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) // move the camera back so we can view the scene
  camera.position.set(0, 0, 10)

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 允许使用阴影贴图
  renderer.shadowMap.enabled = true
  // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
  renderer.setPixelRatio(window.devicePixelRatio)
  const box = new THREE.Box3()
  box.setFromCenterAndSize(new THREE.Vector3(1, 1, 1), new THREE.Vector3(2, 1, 3))

  const helper = new THREE.Box3Helper(box, 0xffff00)
  scene.add(helper)
  document.querySelector('#webgl').appendChild(renderer.domElement)
}

onMounted(() => {
  base()
  animate()
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
