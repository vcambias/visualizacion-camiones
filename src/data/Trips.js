import { ref } from 'vue';

const trips = ref([]);

const addTrip = (trip) => {
  trips.value.push(trip);
};

const getTrips = () => {
  return trips.value;
};

const getTripById = (id) => {
  return trips.value.find((trip) => trip.tripId === id);
};

export { addTrip, getTrips, getTripById };