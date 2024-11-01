import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'

export class HelpUtils {
  scene: THREE.Scene
  stats!: Stats

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  addAxesHelper() {
    // 坐标系
    const axesHelper = new THREE.AxesHelper(5000)
    this.scene.add(axesHelper)
  }

  addStats() {
    // fps
    this.stats = new Stats()
    onMounted(() => {
      document.body.appendChild(this.stats.dom)
    })
  }
  updated() {
    this.stats?.update() // 刷新时间
  }
}
