<script setup lang="ts">
import { WorldEvent } from '../models/interfaces';
import { useEventStore } from '../stores/EventStore';
import { useRouter } from 'vue-router'

const router = useRouter();

const eventStore = useEventStore();

function goToDishList(id:number){
  eventStore.updateIDAndDishes(id);
  router.push({name:'dishes'})
}

function getDishesLength(currentEvent: WorldEvent){
  if (currentEvent.dishes) {
    const realDishes = currentEvent.dishes.filter(d => d !== undefined);
    return realDishes.length;
  }
  return 0;
}

eventStore.updateEventList();
</script>

<template>
  <div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Number of People</th>
          <th>Number Of Dishes</th>
        </tr>
      </thead>
      <tbody v-if="eventStore.getEvents.length > 0">
        <tr v-for="currentEvent in eventStore.getEvents" :key="currentEvent.id" @click="goToDishList(currentEvent.id)">
          <td>{{ currentEvent.name }}</td>
          <td>{{ new Date(currentEvent.date).toLocaleDateString() }}</td>
          <td>{{ currentEvent.peopleCount }}</td>
          <td>{{ getDishesLength(currentEvent) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse; /* Merge table borders */
}

.custom-table th,
.custom-table td {
  padding: 10px; /* Add more space around content */
  border: 1px solid #ccc; /* Add a border to cells */
}

.custom-table th {
  background-color: #f2f2f2; /* Add a background color to header cells */
}

.custom-table tbody tr:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>../helper/firebaseListener