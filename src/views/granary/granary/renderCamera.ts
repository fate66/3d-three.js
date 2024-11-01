import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Gui } from '@/components/gui'
import * as THREE from 'three'

export class RenderCamera {
  scene: THREE.Scene
  camera!: THREE.OrthographicCamera | THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls!: OrbitControls
  s = 100 //根据你想要渲染的范围设置相机渲染范围大小

  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    this.scene = scene
    this.renderer = renderer
  }

  initOrthographicCameraAndOrbitControls() {
    this.initOrthographicCamera()
    this.initOrbitControls()
    return this
  }

  initPerspectiveCameraAndOrbitControls() {
    this.initPerspectiveCamera()
    this.initOrbitControls()
    return this
  }

  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 是否有惯性
    this.controls.enableDamping = false
    // 是否可以缩放
    // controls.enableZoom = true
    this.controls.update()
    this.controls.addEventListener('change', v => {
      // console.log('camera', this.camera.position)
    })
    return this
  }
  initPerspectiveCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(148, 70, 0)
    this.camera.lookAt(0, 0, 0)
    this.scene.add(this.camera)

    // const gui = new Gui()
    // gui.add(this.camera)
    return this
  }

  initOrthographicCamera() {
    // width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
    const width = window.innerWidth //窗口文档显示区的宽度
    const height = window.innerHeight //窗口文档显示区的高度

    const k = width / height //Three.js输出的Cnavas画布宽高比
    // var s = 200; //控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大

    //THREE.OrthographicCamera()创建一个正投影相机对象
    // -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
    this.camera = new THREE.OrthographicCamera(-this.s * k, this.s * k, this.s, -this.s, 0.1, 1000)
    this.camera.position.set(350, 150, 100)
    this.camera.lookAt(0, 0, 0) //相机指向Three.js坐标系原点
    this.scene.add(this.camera)
    return this
  }
  resetCamera() {
    const width = window.innerWidth //canvas画布宽度
    const height = window.innerHeight //canvas画布高度
    // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
    if (this.camera instanceof THREE.OrthographicCamera) {
      // 2.1.更新相机参数
      //canvas画布宽高比会影响left, right需要跟着更新
      const k = width / height //canvas画布宽高比
      this.camera.left = -this.s * k
      this.camera.right = this.s * k
      // 2.2.相机的left, right等属性变化了，通知threejs系统
    } else if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height
    }
    this.camera.updateProjectionMatrix()
  }
  update() {
    this.controls?.update()
  }
}
