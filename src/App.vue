<script setup>
import TruckVisualization from './components/TruckVisualization.vue'
import FileLoader from './components/FileLoader.vue'
import { ref } from 'vue'
import TruckCard from './components/TruckCard.vue'
import LoadCard from './components/LoadCard.vue'
import TripSelector from './components/TripSelector.vue'
import TripStatsCard from './components/TripStatsCard.vue'
</script>

<script>
const containerSize = ref({ width: 0, height: 0, depth: 0 })
const tripId = ref(0)
const truckName = ref("")
const tripWeight = ref(0)
const tripClients = ref([])
const loads = ref([])
const loadClicked = ref(null)
const renderKey = ref(0)
const tripVolume = ref(0)

function handleLoadClick(data){
  loadClicked.value = data.loadClicked
}

function handleTripSelected(data){
  tripId.value = data.tripId
  truckName.value = data.truckName
  tripWeight.value = data.weight
  tripClients.value = data.clients
  containerSize.value = data.containerSize
  loads.value = data.loads
  handleLoadClick([])
  renderKey.value += 1
  tripVolume.value = data.volume
}
</script>

<template>
    <FileLoader id="FileLoader" />
    <TruckVisualization :key="renderKey" :containerSize="containerSize" :loads="loads" @load-clicked="handleLoadClick"/>
    <div id="Overlapping">
      <div id="Selector">
        <TripSelector @trip-selected="handleTripSelected"/>
        <TripStatsCard :tripStats="{value: {truckName: truckName, clients: tripClients, volume: tripVolume, weight: tripWeight}}"></TripStatsCard>
      </div>
      <div id="Info">
        <TruckCard :tripData="{value: {tripId: tripId, truckType: truckName, totalWeight: tripWeight, totalVolume: tripVolume, clients: tripClients}}" />
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