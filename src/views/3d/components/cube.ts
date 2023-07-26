import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils, TextureLoader } from 'three'
// import * as THREE from 'three'

import uvBw from '@/image/textures/uv-test-bw.png'
const radiansPerSecond = MathUtils.degToRad(30)

function createMaterial() {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(uvBw)
  // const material = new MeshStandardMaterial({ color: 'yellow', map: texture })
  const material = new MeshStandardMaterial({ map: texture })

  return material
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = createMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.rotation.set(-0.5, -0.1, 0.8)

  // this method will be called once per frame
  ;(cube as any).tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }

  return cube
}

export { createCube }
