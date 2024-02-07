<script setup>
import TruckVisualization from './components/TruckVisualization.vue'
import FileLoader from './components/FileLoader.vue'
import { ref } from 'vue'
</script>

<script>
const containerSize = ref({ width: 0, height: 0, depth: 0 })
const loads = ref([])

function handleFileLoaded(data){
  containerSize.value = data.containerSize
  loads.value = data.loads
  console.log(containerSize.value, loads.value)
}
</script>

<template>
    <FileLoader id="FileLoader" @file-loaded="handleFileLoaded"  />
    <TruckVisualization :containerSize="containerSize" :loads="loads" />
</template>

<style>
html,
#FileLoader {
    position: relative;
    z-index: 1;
}
</style>