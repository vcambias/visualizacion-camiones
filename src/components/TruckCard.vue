<script>
import { ref, watch } from 'vue'
import * as TruckSizes from '../data/TruckSizes.js'

export default {
  props: {
    tripData: Object
  },
  setup(props) {
    const tripData = ref(null)
    const truckSizes = TruckSizes.truckSizes

    watch(() => {
      tripData.value = props.tripData
    })

    return {
      tripData,
      truckSizes
    }
  }
}
</script>

<template>
  <div class="card" id="TruckCard">
    <div v-if="tripData.value.clients.length > 0">
      <div>Trip N° {{ tripData.value.tripId }}</div>

      <div>Truck Type: {{ tripData.value.truckType }}</div>
      
      <div>Clients:</div>
      <ul>
        <li v-for="client in tripData.value.clients" :key="client.clientName">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="3" :fill="client.clientColor" />
          </svg> 
          {{ client.clientName }} ({{ client.distance }} km)
        </li>
      </ul>
    </div>

    <div v-else>
      <div>No truck yet.</div>
    </div>
  </div>
</template>
