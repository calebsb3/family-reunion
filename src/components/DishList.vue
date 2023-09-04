<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventStore } from '../stores/EventStore';
import { DishType } from '../models/interfaces';
import { useRouter } from 'vue-router'

const router = useRouter();

const eventStore = useEventStore();

const nameToAdd = ref("");
const bringerToAdd = ref("");
const typeToAdd = ref(DishType.side);
const amountToAdd = ref(0);


const formattedDate = computed(()=>{
    const currentDate = eventStore.getCurrentEvent?.date
    if (currentDate) {
        return new Date(currentDate).toLocaleDateString();
    } 
    return new Date();
})

const getNumPeople = computed(() => {
  const currentPeopleCount = eventStore.getCurrentEvent?.peopleCount;
  return currentPeopleCount !== undefined ? currentPeopleCount : 0;
})

const filteredTypes = computed(() => {
  return Object.keys(DishType).filter(key => !isNaN(Number(key))).map(key => Number(key));
})

function formatDishType(type: number){
    const dishString = DishType[type];
    return dishString.charAt(0).toUpperCase() + dishString.slice(1);
}

function AddDish(){
    const newDish = {name: nameToAdd.value, 
        bringer: bringerToAdd.value, 
        type: typeToAdd.value}
    eventStore.addADish(newDish);
}

function ToEvents() {
  router.push({name:'events'})
}

function updateNumPeople(){
  eventStore.updatePeopleCount(getNumPeople.value + amountToAdd.value);
}
</script>

<template>
  <button class="mb-3" @click="ToEvents()">Events</button>
  <div class="container pb-2">
    <div class="row">
      <div class="col-md-4 pt-view-custom">
        <div class="row mb-3">
          <h2>Number of People Attending: {{ getNumPeople }}</h2>
        </div>
        <div class="row">
          <p>How many people are coming with you? (Include yourself)</p>
        </div>
        <div class="row">
          <div class="col">
            <input type="number" placeholder="1" v-model="amountToAdd">
          </div>
          <div class="col">
            <button @click="updateNumPeople()">Update</button>
          </div>
        </div>
      </div>
      <div class="col-md-8 pt-view-custom">
        <div class="row pb-2">
          <h2>Dishes for {{ eventStore.getCurrentEvent?.name }} on {{ formattedDate }}</h2>
        </div>
        <div class="row pb-2">
          <div class="col-md-3 pt-form-custom">
            <input type="text" class="form-control" placeholder="Add a dish..." v-model="nameToAdd">
          </div>
          <div class="col-md-3 pt-form-custom">
            <input type="text" class="form-control" placeholder="Who's bringing it?" v-model="bringerToAdd">
          </div>
          <div class="col-md-3 pt-form-custom">
            <select v-model="typeToAdd">
                <option disabled value="">Select a status</option>
                <option v-for="type in filteredTypes" :value="type" :key="type">{{ DishType[type] }}</option>
            </select>
          </div>
          <div class="col-md-3 pt-form-custom">
            <button class="btn btn-primary" @click="AddDish()">Add Dish</button>
          </div>
        </div>
        <div class="row">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Bringer</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dish, index) in eventStore.currentEventDishList" :key="index">
                <td>{{ dish.name }}</td>
                <td>{{ dish.bringer }}</td>
                <td>{{ formatDishType(dish.type) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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

@media (max-width: 576px) {
  .pt-view-custom {
    padding-top: 3rem; /* Customize the padding size */
  }
  .pt-form-custom {
    padding-top: 1rem;
  }
}
</style>../helper/firebaseListener