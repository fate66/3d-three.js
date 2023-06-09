import * as THREE from 'three'

// 矩形平面坐标
const rectGeomentry = function () {
  // 创建空的几何体
  const bufferGeometry = new THREE.BufferGeometry()
  //设置几何体的顶点坐标
  const vertices = new Float32Array([0, 0, 0, 20, 0, 0, 0, 10, 0, 20, 0, 0, 20, 10, 0, 0, 10, 0])
  //指定这个坐标几个值为一个顶点
  const attribue = new THREE.BufferAttribute(vertices, 3)
  // 设置几何体的坐标属性
  bufferGeometry.attributes.position = attribue
  return bufferGeometry
}

// 矩形索引平面坐标
const rectIndexGeomentry = function () {
  // 创建空的几何体
  const bufferGeometry = new THREE.BufferGeometry()
  // 利用顶点索引 去除 重复的点
  const vertices = new Float32Array([
    0,
    0,
    0, // 顶点1 索引0
    20,
    0,
    0, // 顶点2  索引1
    0,
    10,
    0, // 顶点2  索引2
    20,
    10,
    0 // 顶点4  索引3
  ])
  //指定这个坐标几个值为一个顶点
  const attribue = new THREE.BufferAttribute(vertices, 3)
  bufferGeometry.attributes.position = attribue

  // 指定顶点索引
  const indexs = new Uint16Array([0, 1, 2, 1, 3, 2])
  // 设置几何体的坐标属性
  bufferGeometry.index = new THREE.BufferAttribute(indexs, 1)
  return bufferGeometry
}

// 随机指定点位
const pointGeometry = function () {
  // 创建空的几何体
  const bufferGeometry = new THREE.BufferGeometry()
  //设置几何体的顶点坐标
  const vertices = new Float32Array([
    0,
    0,
    0, //顶点1坐标
    50,
    0,
    0, //顶点2坐标
    0,
    100,
    0, //顶点3坐标
    0,
    0,
    10, //顶点4坐标
    0,
    0,
    100, //顶点5坐标
    50,
    0,
    10 //顶点6坐标
  ])
  //指定这个坐标几个值为一个顶点
  const attribue = new THREE.BufferAttribute(vertices, 3)
  // 设置几何体的坐标属性
  bufferGeometry.attributes.position = attribue
  return bufferGeometry
}

export default { rectGeomentry, pointGeometry, rectIndexGeomentry }
