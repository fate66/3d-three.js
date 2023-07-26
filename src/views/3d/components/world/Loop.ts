import { Camera, Clock, Object3D, Scene, WebGLRenderer } from 'three'
const clock = new Clock()
// 动画控制
class Loop {
  public camera: Camera
  public scene: Scene
  public renderer: WebGLRenderer
  private updatables: any[]
  static delta: number

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      Loop.delta = clock.getDelta()
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop(): void {
    this.renderer.setAnimationLoop(null)
  }

  playAnimationAll(): void {
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      object.tick(delta)
    }
  }

  playSignAnimation(object: Object3D): void {
    const list = this.findObject(object)
    if (list) {
      // TODO: 如何调用基类上不存在的方法
      ;(list[1] as any).tick(Loop.delta)
    }
  }

  addAnimationObject(object: Object3D): void {
    this.updatables.push(object)
  }

  findObject(object: Object3D): [number, Object3D] | null {
    for (let index = 0, len = this.updatables.length; index < len; index++) {
      if (this.updatables[index].uuid === object.uuid) {
        return [index, this.updatables[index]]
      }
    }
    return null
  }
  removeAnimationObject(object: Object3D): void {
    const list = this.findObject(object)
    if (list) {
      this.updatables.splice(list[0], 1)
    }
  }
}

export { Loop }
