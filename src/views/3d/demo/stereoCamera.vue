// 立体相机
<template>
  <div id="webgl"></div>
</template>

<script setup>
import { nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import geomentry from './geomentry.js'

// 创建场景
const scene = new THREE.Scene()

// 创建立体相机
const stereoCamera = new THREE.StereoCamera(0.1, 1000, 0.064)

// 创建渲染目标
const leftTarget = new THREE.WebGLRenderTarget(window.innerWidth / 2, window.innerHeight, { format: THREE.RGBFormat })
const rightTarget = new THREE.WebGLRenderTarget(window.innerWidth / 2, window.innerHeight, { format: THREE.RGBFormat })

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建一个简单的几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
scene.add(cube)

// 创建一个材质来显示立体图像
const material = new THREE.ShaderMaterial({
  uniforms: {
    tLeft: { value: leftTarget.texture },
    tRight: { value: rightTarget.texture }
  },
  vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
  fragmentShader: `
        uniform sampler2D tLeft;
        uniform sampler2D tRight;
        varying vec2 vUv;
        void main() {
            vec4 left = texture2D(tLeft, vUv);
            vec4 right = texture2D(tRight, vUv);
            gl_FragColor = mix(left, right, vUv.x > 0.5 ? 1.0 : 0.0);
        }`
})

const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
scene.add(quad)

// 渲染循环
function animate() {
  requestAnimationFrame(animate)

  // 更新立体相机的位置
  // stereoCamera.position.set(0, 0, 5)

  // 渲染左眼视图
  renderer.setRenderTarget(leftTarget)
  renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight)
  renderer.render(scene, stereoCamera.leftCamera)

  // 渲染右眼视图
  renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight)
  renderer.render(scene, stereoCamera.rightCamera)

  // 设置回默认的渲染目标
  renderer.setRenderTarget(null)

  // 渲染立体图像
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
  renderer.render(scene, stereoCamera)

  // 移除 quad，避免重复渲染
  scene.remove(quad)
}

animate()
</script>
