<script>
import { ref, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import * as TruckSizes from '../data/TruckSizes.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Doughnut
  },
  props: {
    tripStats: Object
  },
  setup(props) {
    const tripStats = ref(null)
    const truckSizes = TruckSizes.truckSizes

    watch(() => {
      tripStats.value = props.tripStats
    })

    return {
      tripStats,
      truckSizes
    }
  },
  computed: {
    weightChartData(){
      const weightChartData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
        }]
      }

      if (this.tripStats.value && this.tripStats.value.clients.length > 0) {
          weightChartData.labels = this.tripStats.value.clients.map(client => client.clientName);
          weightChartData.datasets[0].data = this.tripStats.value.clients.map(client => client.weight);
          weightChartData.datasets[0].backgroundColor = this.tripStats.value.clients.map(client => client.clientColor);

          const totalWeight = parseFloat(TruckSizes.truckSizes[this.tripStats.value.truckName].max_weight);
          const usedWeight = this.tripStats.value.clients.reduce((total, client) => total + parseFloat(client.weight), 0);
          const freeWeight = totalWeight - usedWeight;

          weightChartData.labels.push("Free Space");
          weightChartData.datasets[0].data.push(freeWeight);
          weightChartData.datasets[0].backgroundColor.push("#D3D3D3"); // Color gris para el espacio libre
      }

      return weightChartData;
    },

    volumeChartData(){
      const volumeChartData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
        }]
      }

      if (this.tripStats.value && this.tripStats.value.clients.length > 0) {
          volumeChartData.labels = this.tripStats.value.clients.map(client => client.clientName);
          volumeChartData.datasets[0].data = this.tripStats.value.clients.map(client => client.volume);
          volumeChartData.datasets[0].backgroundColor = this.tripStats.value.clients.map(client => client.clientColor);

          const totalVolume = parseFloat(TruckSizes.truckSizes[this.tripStats.value.truckName].volume);
          const usedVolume = this.tripStats.value.clients.reduce((total, client) => total + parseFloat(client.volume), 0);
          const freeVolume = totalVolume - usedVolume;

          volumeChartData.labels.push("Free Space");
          volumeChartData.datasets[0].data.push(freeVolume);
          volumeChartData.datasets[0].backgroundColor.push("#D3D3D3"); // Color gris para el espacio libre
      }

      return volumeChartData;
    },

    options(){
      const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }
    }
    return options;
    }
}}
</script>

<template>
  <div class="card" id="TripStats">
    <div v-if="tripStats.value && tripStats.value.clients.length > 0">
        <h3>Trip Weight: {{ tripStats.value.weight }} t</h3>
        <h4>Max Weight: {{ truckSizes[this.tripStats.value.truckName].max_weight }} t</h4>
        <h5><i>Occupancy rate: ({{ (tripStats.value.weight * 100 / (truckSizes[this.tripStats.value.truckName]).max_weight).toFixed(2) }} %)</i></h5>
        <Doughnut class="chart" :data="weightChartData" :options="options"/>
        
        <h3>Trip Volume: {{ (tripStats.value.volume).toFixed(2) }} m³</h3>
        <h4>Max Volume: {{ ((truckSizes[this.tripStats.value.truckName]).volume).toFixed(2) }} m³</h4>
        <h5><i>Occupancy rate: ({{ (tripStats.value.volume * 100 / (truckSizes[this.tripStats.value.truckName]).volume).toFixed(2) }} %)</i></h5>
        <Doughnut class="chart" :data="volumeChartData" :options="options"/>
    </div>

    <div v-else>
      <div>No trip yet.</div>
    </div>
  </div>
</template>

<style>
.chart{
  position: relative !important;
  height: 175px !important;
  width: 175px !important;
}
h3,h4,h5{
  margin: 1px;
}
</style>