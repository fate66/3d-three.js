import type { Object3D } from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
class Gui {
  public gui: GUI
  constructor() {
    this.gui = new GUI()
  }

  addFolder(title: string): GUI {
    const dirFolder = this.gui.addFolder(title)
    dirFolder.close() //关闭菜单
    return dirFolder
  }
  addArray(gui: GUI, prop: any, value: any, options: Array<any>): void {
    gui.add(prop, value, options[0], options[1])
  }
}

export { Gui }
