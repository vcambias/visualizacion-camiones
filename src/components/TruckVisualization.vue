<script setup>
import { TresCanvas } from '@tresjs/core'
import {CameraControls, Line2} from '@tresjs/cientos'
import * as THREE from 'three'
import { reactive, defineEmits, watchEffect } from 'vue'
import { ref } from 'vue'

const props = defineProps(['containerSize', 'loads'])
const emits = defineEmits()

let CONTAINER_SIZE = reactive({ width: 0, height: 0, depth: 0 })
let loads = reactive([])
let loadLines = []
let lines = []
let selectedLoad = ref(null)

const getLines = () => {
  let containerVertices = [
        [0,0,0],
        [CONTAINER_SIZE.width,0,0],
        [CONTAINER_SIZE.width,CONTAINER_SIZE.height,0],
        [0,CONTAINER_SIZE.height,0],
        [0,0,CONTAINER_SIZE.depth],
        [CONTAINER_SIZE.width,0,CONTAINER_SIZE.depth],
        [CONTAINER_SIZE.width,CONTAINER_SIZE.height,CONTAINER_SIZE.depth],
        [0,CONTAINER_SIZE.height,CONTAINER_SIZE.depth]
      ]

  let containerVerticesEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ]

  let lines = reactive(containerVerticesEdges.map(([startIdx, endIdx]) => {
    let start = containerVertices[startIdx]
    let end = containerVertices[endIdx]
    return {
      start: new THREE.Vector3(...start),
      end: new THREE.Vector3(...end)
    }
  }))

  return lines
}

const getLoadLines = () => {
  let loadLines = reactive(loads.map(load => {
    let vertices = [
      [load.ini_x, load.ini_y, load.ini_z],
      [load.fin_x, load.ini_y, load.ini_z],
      [load.fin_x, load.fin_y, load.ini_z],
      [load.ini_x, load.fin_y, load.ini_z],
      [load.ini_x, load.ini_y, load.fin_z],
      [load.fin_x, load.ini_y, load.fin_z],
      [load.fin_x, load.fin_y, load.fin_z],
      [load.ini_x, load.fin_y, load.fin_z],
    ]

    let edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]

    return edges.map(([startIdx, endIdx]) => {
      let start = vertices[startIdx]
      let end = vertices[endIdx]
      return {
        start: new THREE.Vector3(...start),
        end: new THREE.Vector3(...end),
        color: load.fragility === "DELICADO" ? '#ffffff' : '#000000'
      }
    })
  }))
  return loadLines
}

watchEffect(() => {
  CONTAINER_SIZE = props.containerSize
  loads = [...props.loads]
  loadLines = getLoadLines()
  lines = getLines()
})

const handleLoadClick = (load) => {
  selectedLoad.value = load
  emits('load-clicked', {loadClicked: load})
}

</script>

<template>
  <template v-if="CONTAINER_SIZE.width > 0">
    <TresCanvas clear-color="#ffffff" window-size>
      <TresPerspectiveCamera :look-at="[0, 0, 0]" :position="[CONTAINER_SIZE.width, CONTAINER_SIZE.height + 20, CONTAINER_SIZE.depth]"/>
      <CameraControls />

      <TresGroup :position="[-CONTAINER_SIZE.width / 2, 3, -CONTAINER_SIZE.depth / 2]">
        <TresMesh :position="[CONTAINER_SIZE.width / 2, CONTAINER_SIZE.height / 2, CONTAINER_SIZE.depth / 2]">
          <TresBoxGeometry :args="[CONTAINER_SIZE.width, CONTAINER_SIZE.height, CONTAINER_SIZE.depth]"/>
          <TresMeshBasicMaterial :color="'#808080'" :opacity="0.25" :transparent="true" :side="THREE.DoubleSide" :depthTest="false" />   
        </TresMesh>

        <template v-for="(line, index) in lines" :key="index">
          <Line2 :points="[line.start.toArray(), line.end.toArray()]" :line-width="2" color="#5A5A5A" />
        </template>

        <template v-for="(load, index) in loads" :key="index">
          <TresMesh :position="[(load.ini_x + load.fin_x) / 2, (load.ini_y + load.fin_y) / 2, (load.ini_z + load.fin_z) / 2]"
          @click="() => handleLoadClick(load)">
            <TresBoxGeometry :args="[load.fin_x - load.ini_x, load.fin_y - load.ini_y, load.fin_z - load.ini_z]"/>
            <TresMeshBasicMaterial :color="load.color" :opacity="selectedLoad === load ? 1 : 0.8" :transparent="selectedLoad === load ? false : true"/>
          </TresMesh>

          <template v-for="(loadLine, idx) in loadLines[index]" :key="idx">
            <Line2 :points="[loadLine.start.toArray(), loadLine.end.toArray()]" :line-width="2" :color="loadLine.color" />
          </template>
        </template>
      </TresGroup>
      <TresGridHelper :args="[CONTAINER_SIZE.depth,CONTAINER_SIZE.width]" :colorCenterLine="'#000000'" />
    </TresCanvas>
  </template>

  <template v-else>
    <div id="message">
      Nothing to see. Load file and select trip to continue. 
    </div>
  </template>

</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
#message{
  font-family: monospace;
  display: flex;
  justify-content: center;
}
</style>