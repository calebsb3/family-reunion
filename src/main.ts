import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import EventsListVue from './components/EventsList.vue'
import DishListVue from './components/DishList.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const routes = [
    { path: '/', name: 'events', component: EventsListVue },
    { path: '/dish', name: 'dishes', component: DishListVue },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
