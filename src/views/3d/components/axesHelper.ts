// 坐标系

import { AxesHelper } from 'three'

function createAxesHelper(length: number = 5): AxesHelper {
  return new AxesHelper(length)
}

export { createAxesHelper }
