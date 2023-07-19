import { BoxBufferGeometry, Mesh, MeshStandardMaterial, MathUtils } from 'three'
const radiansPerSecond = MathUtils.degToRad(30)
function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 'purple' })

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.rotation.set(-0.5, -0.1, 0.8)

  // this method will be called once per frame
  cube.tick = delta => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }

  return cube
}

export { createCube }
