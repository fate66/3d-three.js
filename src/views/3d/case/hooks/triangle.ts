import {
  BufferGeometry,
  Object3D,
  Color,
  BufferAttribute,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  BoxGeometry,
  TextureLoader,
  RepeatWrapping,
  MeshLambertMaterial,
  MirroredRepeatWrapping,
  NearestFilter,
  MixOperation,
  AddOperation,
  CubeTextureLoader,
  SphereGeometry
} from 'three'
import door from '@/image/textures/door/color.jpg'
import { createTexture } from '../../components/texLoader'
import minecraft from '@/image/textures/minecraft.png'
import alpha from '@/image/textures/door/alpha.jpg'
import ambientOcclusion from '@/image/textures/door/ambientOcclusion.jpg'
import height from '@/image/textures/door/height.jpg'
import roughness from '@/image/textures/door/roughness.jpg'
import normal from '@/image/textures/door/normal.jpg'
import metalness from '@/image/textures/door/metalness.jpg'
import nx from '@/image/textures/environmentMaps/1/nx.jpg'
import ny from '@/image/textures/environmentMaps/1/ny.jpg'
import nz from '@/image/textures/environmentMaps/1/nz.jpg'
import px from '@/image/textures/environmentMaps/1/px.jpg'
import py from '@/image/textures/environmentMaps/1/py.jpg'
import pz from '@/image/textures/environmentMaps/1/pz.jpg'

const texture = createTexture()

// 科技三角形
function createTriangle(): Array<Object3D> {
  const meshs = []
  for (let i = 0; i < 50; i++) {
    // 每一个三角形，需要3个顶点，每个顶点需要3个值
    const geometry = new BufferGeometry()
    const positionArray = new Float32Array(9)
    for (let j = 0; j < 9; j++) {
      positionArray[j] = Math.random() * 10 - 5
      geometry.setAttribute('position', new BufferAttribute(positionArray, 3))
      let color = new Color(Math.random(), Math.random(), Math.random())
      const material = new MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 }) // 根据几何体和材质创建物体
      const mesh = new Mesh(geometry, material)
      meshs.push(mesh)
    }
  }
  return meshs
}

function createPattern(): any {
  const map = texture.load(door)

  // 导入门纹理
  // doorColorTexture.offset.set(0.5, 0.5)
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  // 导入的纹理会自动放大或者缩小而不变形

  texture.load(minecraft, map => {
    // map.wrapS = RepeatWrapping
    // map.wrapT = MirroredRepeatWrapping // 镜像重复，翻转
    // map.repeat.set(2, 2)
    // map.anisotropy = 4
    material.map = map
    material.needsUpdate = true
  })

  const material = new MeshBasicMaterial({ color: 'yellow' })
  const geometry = new BoxGeometry(1, 1, 1)
  const cube = new Mesh(geometry, material)
  return cube
}

// 纹理算法
function createMinecraft(): any {
  // 导入的纹理会自动放大或者缩小而不变形
  texture.load(minecraft, map => {
    material.map = map
    material.needsUpdate = true
    // NearestFilter 当纹理离人特别近时，一个文素大于一个图片像素时，图片不会模糊,默认会模糊
    map.magFilter = NearestFilter
    // NearestFilter 当纹理离人特别远时
    map.minFilter = NearestFilter
  })

  const material = new MeshBasicMaterial({ color: 'yellow' })
  const geometry = new BoxGeometry(1, 1, 1)
  const cube = new Mesh(geometry, material)
  return cube
}

// 透明纹理，可以将图的某些地方设为透明，不可见
function createAlpha(): any {
  texture.load(alpha, map => {
    console.log(map)
    material.alphaMap = map
    material.needsUpdate = true
  })
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  console.log(texture)

  const material = new MeshBasicMaterial({ color: 'yellow', transparent: true })
  const geometry = new BoxGeometry(1, 1, 1)
  const cube = new Mesh(geometry, material)
  return cube
}

// 环境遮挡贴图,主要用于给环境添加遮挡,比如讲们的某个地方加黑
function createambientOcclusion(): any {
  texture.load(alpha, map => {
    console.log(map)
    material.alphaMap = map
    material.needsUpdate = true
  })
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  texture.load(ambientOcclusion, map => {
    material.aoMap = map
    material.aoMapIntensity = 1
    material.needsUpdate = true
  })

  console.log(texture)

  const material = new MeshBasicMaterial({ color: 'yellow', transparent: true })
  const geometry = new BoxGeometry(1, 1, 1)
  geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))
  console.log(geometry, 'geometry')
  const cube = new Mesh(geometry, material)
  return cube
}

// PBR材质,同时添加高度贴图，使一个平面看起来有高度
function createStand(): any {
  // 导入的纹理会自动放大或者缩小而不变形
  texture.load(alpha, map => {
    console.log(map)
    material.alphaMap = map
    material.needsUpdate = true
  })
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  texture.load(ambientOcclusion, map => {
    material.aoMap = map
    material.aoMapIntensity = 1
    material.needsUpdate = true
  })

  texture.load(height, map => {
    material.displacementMap = map
    material.displacementScale = 0.1 // 设置最大的突出程度
    material.needsUpdate = true
  })

  console.log(texture)

  const material = new MeshStandardMaterial({ color: 'yellow', transparent: true })
  const geometry = new BoxGeometry(1, 1, 1, 200, 200)
  geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))
  console.log(geometry, 'geometry')
  const cube = new Mesh(geometry, material)
  return cube
}

// PBR材质,粗糙度贴图
function createRoughness(): any {
  texture.load(alpha, map => {
    console.log(map)
    material.alphaMap = map
    material.needsUpdate = true
  })
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  texture.load(ambientOcclusion, map => {
    material.aoMap = map
    material.aoMapIntensity = 1
    material.needsUpdate = true
  })

  texture.load(height, map => {
    material.displacementMap = map
    material.displacementScale = 0.1 // 设置最大的突出程度
    material.needsUpdate = true
  })

  // 粗糙度贴图
  texture.load(roughness, map => {
    material.roughnessMap = map
    material.roughness = 1 // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射
    material.needsUpdate = true
  })

  console.log(texture)

  const material = new MeshStandardMaterial({ color: 'yellow', transparent: true })
  const geometry = new BoxGeometry(1, 1, 1, 200, 200)
  geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))
  console.log(geometry, 'geometry')
  const cube = new Mesh(geometry, material)
  return cube
}

// PBR材质,法线贴图， 金属贴图，涵盖了所有的贴图
function createRormal(): any {
  texture.load(alpha, map => {
    console.log(map)
    material.alphaMap = map
    material.needsUpdate = true
  })
  // 贴图
  texture.load(door, map => {
    material.map = map
    material.needsUpdate = true
  })

  // 透明贴图，使某些部分透明
  texture.load(ambientOcclusion, map => {
    material.aoMap = map
    material.aoMapIntensity = 1
    material.needsUpdate = true
  })

  // 突出程度贴图
  texture.load(height, map => {
    material.displacementMap = map
    material.displacementScale = 0.2 // 设置最大的突出程度
    material.needsUpdate = true
  })

  // 粗糙度贴图，是物体变得粗糙或者光滑
  texture.load(roughness, map => {
    material.roughnessMap = map
    material.roughness = 1 // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射
    material.needsUpdate = true
  })
  // 法线贴图，使光照到物体的边缘时出现不同的样式
  texture.load(normal, map => {
    material.normalMap = map
    material.needsUpdate = true
  })
  // 金属贴图，使某些部分变得像金属一样
  texture.load(metalness, map => {
    material.metalnessMap = map
    material.metalness = 1 // 材质与金属的相似度，当与贴图一起使用时，两者相乘
    material.needsUpdate = true
  })
  // 环境遮挡贴图,主要用于给环境添加遮挡,比如讲们的某个地方加黑
  texture.load(ambientOcclusion, map => {
    material.aoMap = map
    material.aoMapIntensity = 1
    material.needsUpdate = true
  })

  console.log(texture)

  const material = new MeshStandardMaterial({ color: 'yellow', transparent: true })
  const geometry = new BoxGeometry(1, 1, 1, 200, 200)
  geometry.setAttribute('uv2', new BufferAttribute(geometry.attributes.uv.array, 2))
  console.log(geometry, 'geometry')
  const cube = new Mesh(geometry, material)
  return cube
}

// 环境贴图
function createEnvMap() {
  const envMap = new CubeTextureLoader().load([px, nx, py, ny, pz, nz])
  const geometry = new SphereGeometry(0.5, 35, 35)
  const material = new MeshStandardMaterial({ metalness: 0.99, roughness: 0.1 })
  const sphere = new Mesh(geometry, material)
  return [sphere, envMap]
}

export {
  createTriangle,
  createPattern,
  createMinecraft,
  createAlpha,
  createambientOcclusion,
  createStand,
  createRoughness,
  createRormal,
  createEnvMap
}
