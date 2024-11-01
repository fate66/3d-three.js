import * as THREE from 'three'
import type { RenderCamera } from './renderCamera'
const fullScreen = (ev: MouseEvent): void => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

export class Resizer {
  static resizeWindow(renderCamera: RenderCamera, renderer: THREE.WebGLRenderer) {
    window.addEventListener('resize', () => {
      // 更新宽高比
      // 更新相机的投影矩阵
      // camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      // // 设置像素比
      // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderCamera.resetCamera()
    })
  }
}
