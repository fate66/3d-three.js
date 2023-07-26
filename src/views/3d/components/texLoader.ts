import { TextureLoader } from 'three'
function createTexture(): TextureLoader {
  return new TextureLoader()
}

export { createTexture }
