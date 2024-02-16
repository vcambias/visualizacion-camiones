<script setup>
import { ref, defineEmits } from 'vue'
import * as TruckSizes from '../data/TruckSizes.js'
import * as Trips from '../data/Trips.js'

const emits = defineEmits()

const fileInput = ref(null)

const openFileExplorer = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const data = await readFile(file)
    processData(data)
  }
}

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsText(file)
  })
}

const processData = (data) => {
  const lines = data.split('\n')
  let currentContainerLoads = []
  let currentTripId = 0
  let lastTripId = 0
  let currentTruckSizes = { width: 0, height: 0, depth: 0 }
  let lastTruckSizes = { width: 0, height: 0, depth: 0 }
  
  for(const line of lines){
    const loadInfo = line.trim().split(';');

    lastTripId = currentTripId;
    currentTripId = loadInfo[9];
    lastTruckSizes = currentTruckSizes;
    currentTruckSizes = TruckSizes.truckSizes[loadInfo[8]];
    
    if(loadInfo[1] === '0' && loadInfo[2] === '0' && loadInfo[3] === '0'){
      if(currentContainerLoads.length > 0){
        const trip = {
          tripId: parseFloat(lastTripId),
          containerSize: lastTruckSizes,
          loads: currentContainerLoads
        }

        Trips.addTrip(trip);
        currentContainerLoads = []
      }
    }

    const load = {
        label: loadInfo[0],
        ini_x: parseFloat(loadInfo[1])/100,
        ini_y: parseFloat(loadInfo[2])/100,
        ini_z: parseFloat(loadInfo[3])/100,
        fin_x: parseFloat(loadInfo[4])/100,
        fin_y: parseFloat(loadInfo[5])/100,
        fin_z: parseFloat(loadInfo[6])/100,
        storage: loadInfo[7]
      };

    currentContainerLoads.push(load)
  }

  const trip = {
    tripId: parseFloat(lastTripId),
    containerSize: lastTruckSizes,
    loads: currentContainerLoads
  }

  Trips.addTrip(trip);
}
</script>

<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" style="display: none" />
    <button @click="openFileExplorer">Load File</button>
  </div>
</template>


