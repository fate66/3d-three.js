<template>
  <div id="webgl"></div>
</template>

<script setup>
import { World } from '@/components/world/World.js'
import { onMounted } from 'vue'

onMounted(() => {
  const world = new World(document.querySelector('#webgl'))
  world.start()
})
</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
