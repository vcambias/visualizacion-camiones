<script>
import { ref, watch } from 'vue'

export default {
  props: {
    loadClicked: Object
  },
  setup(props) {
    const loadData = ref(null)

    watch(() => {
      loadData.value = props.loadClicked
    })
    
    return {
      loadData
    }
  }
}
</script>

<template>
  <div class="card" id="LoadCard">
    <div v-if="loadData">
      <div>Material {{ loadData.label }}</div>
      <div>Storage: {{ loadData.storage }}</div>
      <div id="Client">
        <svg width="10" height="10">
          <circle cx="5" cy="5" r="3" :fill="loadData.color" />
        </svg> 
        <div>Client: {{ loadData.client }}</div>   
      </div>
      <div>Order N° {{ loadData.order }}</div>
      <div>Product Type: {{ loadData.prod_type }}</div>
      <div>Item: {{ loadData.item }}</div>
      <div>Package Width: {{ (loadData.width/1000).toFixed(2) }} m</div>
      <div>Package Height: {{ (loadData.height/1000).toFixed(2) }} m</div>
      <div>Destination Location: {{ loadData.locality }}</div>
    </div>

    <div v-else>
      <div>No load selected.</div>
    </div>
  </div>
</template>

<style>
#Client{
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
}
svg{
  margin-right: 6px;
}
</style>
