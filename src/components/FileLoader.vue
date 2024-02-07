<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits()

const fileInput = ref(null)
const containerSize = ref({ width: 0, height: 0, depth: 0 })
const loads = ref([])

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
  // Obtener medidas del contenedor
  const containerLine = lines.shift().trim().split(',')
  containerSize.value = {
    width: parseFloat(containerLine[0]),
    height: parseFloat(containerLine[1]),
    depth: parseFloat(containerLine[2])
  }

  // Obtener información de las cargas
  loads.value = lines.map(line => {
    const loadInfo = line.trim().split(',')
    return {
      label: loadInfo[0],
      ini_x: parseFloat(loadInfo[1]),
      ini_y: parseFloat(loadInfo[2]),
      ini_z: parseFloat(loadInfo[3]),
      fin_x: parseFloat(loadInfo[4]),
      fin_y: parseFloat(loadInfo[5]),
      fin_z: parseFloat(loadInfo[6])
    }
  })

  emits('file-loaded', { containerSize: containerSize.value, loads: loads.value })
}
</script>

<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" style="display: none" />
    <button @click="openFileExplorer">Load File</button>
  </div>
</template>


