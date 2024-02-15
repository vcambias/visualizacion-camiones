<script>
import { ref, watch } from 'vue'

export default {
  props: {
    containerSize: Object
  },
  setup(props) {
    const truckData = ref(null)

    watch(() => {
      truckData.value = props.containerSize
    })

    return {
      truckData
    }
  }
}
</script>

<template>
  <div class="card" id="TruckCard">
    <div v-if="truckData.width > 0">
      <div>Truck Size</div>
      <div>Width: {{ truckData.width }}</div>
      <div>Height: {{ truckData.height }}</div>
      <div>Length: {{ truckData.depth }}</div>
    </div>

    <div v-else>
      <div>No truck yet.</div>
    </div>
  </div>
</template>
