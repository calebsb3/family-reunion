<script setup lang="ts">
import { useEventStore } from '../stores/EventStore';

const eventStore = useEventStore();

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
        </tr>
      </thead>
      <tbody v-if="eventStore.getEvents.length > 0">
        <tr v-for="currentEvent in eventStore.getEvents" :key="currentEvent.id">
          <td>{{ currentEvent.name }}</td>
          <td>{{ new Date(currentEvent.date).toLocaleDateString() }}</td>
          <td>{{ currentEvent.peopleCount }}</td>
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