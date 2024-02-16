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
    </div>

    <div v-else>
      <div>No load selected.</div>
    </div>
  </div>
</template>
