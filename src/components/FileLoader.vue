<script setup>
import { ref, defineEmits } from 'vue'
import * as TruckSizes from '../data/TruckSizes.js'
import * as Trips from '../data/Trips.js'

const emits = defineEmits()
const clientColors = {}
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
  let currentContainerWeight = 0
  let currentContainerVolume = 0
  let currentContainerClients = []

  let currentTripId = 0
  let lastTripId = 0
  let currentTruckSizes = { width: 0, height: 0, depth: 0 }
  let lastTruckSizes = { width: 0, height: 0, depth: 0 }
  let currentTruckName = ""
  let lastTruckName = ""
  
  for(const line of lines){
    const loadInfo = line.trim().split(';');

    lastTripId = currentTripId;
    currentTripId = loadInfo[9];
    lastTruckSizes = currentTruckSizes;
    currentTruckSizes = TruckSizes.truckSizes[loadInfo[8]];
    lastTruckName = currentTruckName;
    currentTruckName = loadInfo[8];
    
    if(lastTripId != currentTripId){
      if(currentContainerLoads.length > 0){
        const trip = {
          tripId: parseFloat(lastTripId),
          containerSize: lastTruckSizes,
          clients: currentContainerClients,
          weight: currentContainerWeight.toFixed(2),
          volume: currentContainerVolume,
          loads: currentContainerLoads,
          truckName: lastTruckName
        }
        trip.max_level = Math.max(...trip.loads.map(load => load.level))

        Trips.addTrip(trip);
        currentContainerLoads = []
        currentContainerClients = []
        currentContainerWeight = 0
        currentContainerVolume = 0
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
        storage: loadInfo[7],
        client: loadInfo[10],
        order: loadInfo[11],
        fragility: loadInfo[12],
        prod_type: loadInfo[13],
        locality: loadInfo[14],
        distance: parseFloat(loadInfo[15].replace(',','.')).toFixed(2),
        weight: parseFloat(loadInfo[16].replace(',','.')).toFixed(2)/1,
        color: getClientColor(loadInfo[10]),
        level: parseFloat(loadInfo[17]),
        item: loadInfo[18],
        width: loadInfo[19],
        height: loadInfo[20],
      };
      load.volume = calculateVolume(load)

    currentContainerWeight += load.weight
    currentContainerVolume += load.volume

    const existingClient = currentContainerClients.find((client) => client.clientName === load.client);
    if (!existingClient) {
      currentContainerClients.push({
        clientName: load.client,
        clientColor: getClientColor(load.client),
        distance: load.distance,
        volume: load.volume,
        weight: load.weight
      });
    } else {
      existingClient.volume += load.volume;
      existingClient.weight += load.weight;
    }

    currentContainerLoads.push(load)
  }

  const trip = {
    tripId: parseFloat(lastTripId),
    containerSize: lastTruckSizes,
    clients: currentContainerClients,
    weight: currentContainerWeight.toFixed(2),
    volume: currentContainerVolume,
    loads: currentContainerLoads,
    truckName: lastTruckName
  }
  trip.max_level = Math.max(...trip.loads.map(load => load.level))

  Trips.addTrip(trip);
}

const getClientColor = (client) => {
  if (!clientColors[client]) {
    clientColors[client] = getRandomColor();
  }
  return clientColors[client];
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const calculateVolume = (load) => {
  const length = Math.abs(load.fin_x - load.ini_x)/10;
  const width = Math.abs(load.fin_y - load.ini_y)/10;
  const height = Math.abs(load.fin_z - load.ini_z)/10;
  return (length * width * height).toFixed(2) / 1;
};
</script>

<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" style="display: none" />
    <button @click="openFileExplorer">Load File</button>
  </div>
</template>


