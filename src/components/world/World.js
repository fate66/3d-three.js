import { createCamera } from '../camera'
import { createCube } from '../cube'
import { createScene } from '../scence'
import { createRenderer } from '../renderer'
import { Resizer } from './Resizer.js'
import { createLights } from '../light'
import { Loop } from './Loop'

let camera, renderer, scene, loop
class World {
  constructor(dom) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)

    dom.append(renderer.domElement)

    const cube = createCube()
    loop.updatables.push(cube)
    scene.add(cube)

    const light = createLights()
    scene.add(cube, light)

    const resizer = new Resizer(dom, camera, renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  render() {
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
