import { AmbientLight, DirectionalLight, HemisphereLight } from 'three'
function createLights(): [DirectionalLight, AmbientLight, HemisphereLight] {
  // 总结：如果是在室外，推荐半球光搭配 HemisphereLight 太阳平行光 DirectionalLight
  // 如果是是室内，推荐使用 半球光 AmbientLight，搭配点光源（灯泡）PointLight或者 RectAreaLight 模拟穿过明亮窗户或条形灯的光线

  // 平行太阳光
  const directionalLight = new DirectionalLight('white', 8)
  // 环境光，可以给物体轻微添加着色
  const ambientLight = new AmbientLight('white', 2)
  // 聚光灯，类似于一个大盖子，从天空向下发光
  const hemisphereLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5 // intensity
  )
  directionalLight.position.set(10, 10, 10)
  ambientLight.position.set(10, 10, 10)
  return [directionalLight, ambientLight, hemisphereLight]
}

export { createLights }
