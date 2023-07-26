// 相机
import { PerspectiveCamera } from 'three'

function createPerspectiveCamera(
  fov: number = 45,
  aspect: number = 1,
  near: number = 0.1,
  far: number = 100
): PerspectiveCamera {
  const camera = new PerspectiveCamera(fov, aspect, near, far)

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10)

  return camera
}

export { createPerspectiveCamera }
