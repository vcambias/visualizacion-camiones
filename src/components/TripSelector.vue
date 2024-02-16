<script>
import { ref, watch, getCurrentInstance } from 'vue';
import { getTrips, getTripById } from '../data/Trips.js';

export default {
  name: 'TripSelector',
  setup() {
    const instance = getCurrentInstance();
    const selectedTrip = ref(null);
    const trips = ref(getTrips());

    watch(() => getTrips(), (newTrips) => {
      trips.value = newTrips;
    });

    watch(() => selectedTrip.value, (newTripId) => {
      const selectedTripData = getTripById(newTripId);
      instance.emit('trip-selected', selectedTripData);
    });

    return {
      selectedTrip,
      trips,
    };
  },
};
</script>

<template>
  <div class="card">
    <label for="tripSelector">Select Trip: </label>
    <select id="tripSelector" v-model="selectedTrip">
      <option class="option" v-for="trip in trips" :key="trip.tripId" :value="trip.tripId">Trip {{ trip.tripId }}</option>
    </select>
  </div>
</template>

<style>
.option{
    font-family: monospace;
}
</style>
