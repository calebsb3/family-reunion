<script setup lang="ts">
import { useEventStore } from '../stores/EventStore';

const eventStore = useEventStore();

const dishes = eventStore.getCurrentEvent?.dishes.filter(d => d !== undefined)

</script>

<template>
  <h2>Dishes for {{ eventStore.getCurrentEvent?.name }}</h2>
  <div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Dish Name</th>
          <th>Bringer</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dish, index) in dishes" :key="index">
          <td>{{ dish.name }}</td>
          <td>{{ dish.bringer }}</td>
          <td>{{ dish.type.toString() }}</td>
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
</style>../helper/firebaseListener