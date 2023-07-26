import { createPerspectiveCamera } from '../camera'
import { createCube } from '../cube'
import { createScene } from '../scence'
import { createRenderer } from '../renderer'
import { Resizer } from './Resizer.js'
import { createLights } from '../light.js'
import { Loop } from './Loop'
import { createOrbitControls } from '../orbitControls'
import { createAxesHelper } from '../axesHelper'
import { Gui } from '../gui'
import type { Camera, Scene, WebGLRenderer, PerspectiveCamera, Object3D } from 'three'

let camera: Camera, renderer: WebGLRenderer, scene: Scene, loop: Loop
class World {
  constructor(dom: any) {
    camera = createPerspectiveCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)
    dom.append(renderer.domElement)

    const cube = createCube()
    loop.addAnimationObject(cube)
    scene.add(cube)

    const gui = new Gui()
    const dirFolder = gui.addFolder('cube')
    gui.addArray(dirFolder, cube.position, 'x', [0, 10])
    gui.addArray(dirFolder, cube.position, 'y', [0, 10])
    gui.addArray(dirFolder, cube.position, 'z', [0, 10])
    gui.gui.destroy()

    const orbitControls = createOrbitControls(camera, renderer)
    orbitControls.target.copy(cube.position)

    const [directionalLight, ambientLight] = createLights()
    scene.add(...[directionalLight, ambientLight])
    console.log(scene)

    const axesHelper = createAxesHelper()
    scene.add(axesHelper)

    const resizer = new Resizer(dom, camera, renderer)
    resizer.onResize = () => {
      this.render()
    }
    this.render()
  }

  render() {
    console.log(111)
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World }
