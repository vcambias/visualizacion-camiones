<script setup>
import TruckVisualization from './components/TruckVisualization.vue'
import FileLoader from './components/FileLoader.vue'
import { ref } from 'vue'
import TruckCard from './components/TruckCard.vue'
import LoadCard from './components/LoadCard.vue'
import TripSelector from './components/TripSelector.vue'
</script>

<script>
const containerSize = ref({ width: 0, height: 0, depth: 0 })
const loads = ref([])
const loadClicked = ref(null)
const renderKey = ref(0)

function handleLoadClick(data){
  loadClicked.value = data.loadClicked
}

function handleTripSelected(data){
  containerSize.value = data.containerSize
  loads.value = data.loads
  handleLoadClick([])
  renderKey.value += 1
}
</script>

<template>
    <FileLoader id="FileLoader" />
    <TruckVisualization :key="renderKey" :containerSize="containerSize" :loads="loads" @load-clicked="handleLoadClick"/>
    <div id="Overlapping">
      <div id="Selector">
        <TripSelector @trip-selected="handleTripSelected"/>
      </div>
      <div id="Info">
        <TruckCard :containerSize="containerSize" />
        <LoadCard :loadClicked="loadClicked" />
      </div>
    </div>
</template>

<style>
html,
#FileLoader {
  position: relative;
  z-index: 1;
  font-family: monospace;
  padding-bottom: 20px;
  padding-top: 20px;
}
#Info {
  position: relative;
  z-index: 1;
  text-align-last: right;
  padding: 10px;
  text-align: -webkit-right;
}
#Selector{
  position: relative;
  z-index: 2;
  text-align-last: left;
  padding-left: 10px;
  padding-top: 10px;
}
#Overlapping{
  -webkit-box-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>