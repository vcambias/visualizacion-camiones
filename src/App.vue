<script setup>
import TruckVisualization from './components/TruckVisualization.vue'
import FileLoader from './components/FileLoader.vue'
import { ref } from 'vue'
import TruckCard from './components/TruckCard.vue'
import LoadCard from './components/LoadCard.vue'
</script>

<script>
const containerSize = ref({ width: 0, height: 0, depth: 0 })
const loads = ref([])
const loadClicked = ref(null)

function handleFileLoaded(data){
  containerSize.value = data.containerSize
  loads.value = data.loads
}

function handleLoadClick(data){
  loadClicked.value = data.loadClicked
}
</script>

<template>
    <FileLoader id="FileLoader" @file-loaded="handleFileLoaded"  />
    <TruckVisualization :containerSize="containerSize" :loads="loads" @load-clicked="handleLoadClick"/>
    <div id="Info">
      <TruckCard :containerSize="containerSize" />
      <LoadCard :loadClicked="loadClicked" />
    </div>
</template>

<style>
html,
#FileLoader {
    position: relative;
    z-index: 1;
    text-align-last: left;
    font-family: monospace;
    padding-left: 20px;
    padding-top: 20px;
}
#Info {
    position: relative;
    z-index: 1;
    text-align-last: right;
    padding: 10px;
    text-align: -webkit-right;
}
</style>