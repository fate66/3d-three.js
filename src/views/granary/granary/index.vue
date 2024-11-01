<template>
  <div id="webgl"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { onMounted, onUnmounted } from 'vue'
import { Granary } from './granary/index'
import { Gui } from '@/components/gui'

onMounted(() => {
  initGranary()
})

function initGranary() {
  const dom = document.querySelector('#webgl')

  if (!dom) return

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.setClearColor(new THREE.Color(0x000000), 1)
  renderer.shadowMap.enabled = true
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace

  dom.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const gui = new Gui()

  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  // width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
  const width = window.innerWidth //窗口文档显示区的宽度
  const height = window.innerHeight //窗口文档显示区的高度
  /**
   * 相机设置
   */
  const k = width / height //Three.js输出的Cnavas画布宽高比
  // var s = 200; //控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
  const s = 100 //根据你想要渲染的粮仓范围设置相机渲染范围大小
  //THREE.OrthographicCamera()创建一个正投影相机对象
  // -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1000)
  camera.position.set(350, 150, 0)
  camera.lookAt(0, 0, 0) //相机指向Three.js坐标系原点
  gui.add(camera)

  // 可视化平行光阴影对应的正投影相机对象
  // const cameraHelper = new THREE.CameraHelper(camera)
  // scene.add(cameraHelper)

  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)

  // 是否有惯性
  controls.enableDamping = false
  // 是否可以缩放
  // controls.enableZoom = true
  controls.update()
  controls.addEventListener('change', v => {
    // console.log('camera', camera.position)
  })

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  // gui.add(ambientLight)
  scene.add(ambientLight)

  const directionLight = new THREE.DirectionalLight(0xffffff, 3)
  directionLight.position.set(200, 100, 20)

  // // 调整阴影贴图分辨率
  // directionLight.shadow.mapSize.width = 2048 // default
  // directionLight.shadow.mapSize.height = 2048 // default
  // directionLight.shadow.camera.near = 0.5 // default
  // directionLight.shadow.camera.far = 5000 // default

  // // 调整阴影相机的参数
  // directionLight.shadow.camera.left = -150
  // directionLight.shadow.camera.right = 150
  // directionLight.shadow.camera.top = 70
  // directionLight.shadow.camera.bottom = -70
  // directionLight.shadow.camera.near = 0.5
  // directionLight.shadow.camera.far = 400

  // gui.add(directionLight)

  // const helper = new THREE.DirectionalLightHelper(directionLight, 50)
  // scene.add(helper)

  // initControls(directionLight, this.camera, box, this.scene)

  // directionLight.castShadow = true
  scene.add(directionLight)

  // 坐标系
  const axesHelper = new THREE.AxesHelper(5000)
  scene.add(axesHelper)

  // fps
  const stats = new Stats()
  document.body.appendChild(stats.dom)

  new Granary(scene, camera)
  function render() {
    renderer.render(scene, camera)
    controls.update()
    stats.update() // 刷新时间
    requestAnimationFrame(render)
  }

  render()

  // window.addEventListener('resize', () => {
  //   // 更新宽高比
  //   // 更新相机的投影矩阵
  //   camera.updateProjectionMatrix()

  //   renderer.setSize(window.innerWidth, window.innerHeight)
  //   // 设置像素比
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // })
}
</script>
