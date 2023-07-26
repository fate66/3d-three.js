<template>
  <div id="webgl"></div>
</template>

<script setup lang="ts">
// import * as three from 'three'
// import { World } from '@/views/3d/components//world/World'
import { onMounted } from 'vue'

// Object.assign(
//   three,
//   Object.defineProperty({}, 'tick', {
//     enumerable: true,
//     value: function () {}
//   })
// )

// console.log(three)

onMounted(() => {
  // const world = new World(document.querySelector('#webgl'))
  // world.start()
})
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
