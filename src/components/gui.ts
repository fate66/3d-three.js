import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const itemType: any = {
  PerspectiveCamera: ['position'], // 透视相机
  AmbientLight: ['color', 'intensity'], // 环境光
  DirectionalLight: ['color', 'intensity', 'position'], // 平行光
  OrthographicCamera: ['position'] // 正交相机
}

const basicProp: any = {
  position: {
    folder: 'position',
    props: {
      x: {
        getValue: (item: any) => {
          return item.position.x
        },
        setValue: (item: any, value: any) => {
          // if (item.type === 'OrthographicCamera') {
          //   item.position.setX(Number(value))
          // } else {

          // }
          item.position.setX(Number(value))
        }
      },
      y: {
        getValue: (item: any) => {
          return item.position.y
        },
        setValue: (item: any, value: any) => item.position.setY(Number(value))
      },
      z: {
        getValue: (item: any) => {
          return item.position.z
        },
        setValue: (item: any, value: any) => item.position.setZ(Number(value))
      }
    }
  },
  color: {
    method: 'addColor',
    getValue: (item: any) => item.color.getStyle(),
    setValue: (item: any, value: any) => item.color.setStyle(value)
  },
  intensity: {
    extends: [0, 10],
    getValue: (item: any) => item.intensity,
    setValue: (item: any, value: any) => (item.intensity = +value)
  }
}

function setPositionType(item: any, value: any) {}

export class Gui {
  public gui: GUI
  controls: any
  constructor() {
    this.gui = new GUI()
    this.controls = {}
  }

  add(item: any) {
    console.log(item)
    const props = itemType[item.type]
    if (!props || !Array.isArray(props)) return
    for (const prop of props) {
      console.log(prop)
      const obj = basicProp[prop]
      if (!obj) continue
      if (obj.folder) {
        const folder = this.addFolder(obj.folder)
        for (const k in obj.props) {
          const v = obj.props[k]
          // this.controls.set(k, v.getValue(item))
          this.controls[k] = v.getValue(item)
          console.log(this.controls)
          folder.add(this.controls, k).onChange((value: Number) => {
            v.setValue(item, value)
          })
        }
      } else {
        this.controls[prop] = obj.getValue(item)
        if (obj.method === 'addColor') {
          this.gui.addColor(this.controls, prop).onChange(v => {
            obj.setValue(item, v)
          })
        } else {
          this.gui.add(this.controls, prop).onChange(v => {
            obj.setValue(item, v)
          })
        }
      }
    }
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
