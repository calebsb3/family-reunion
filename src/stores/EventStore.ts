// stores/eventStore.ts
import { defineStore } from 'pinia';
import { Dish, WorldEvent } from '../models/interfaces'
import { ref, onValue, set } from "firebase/database";
import { firebaseDB } from "../helper/firebaseConfig";

export const useEventStore = defineStore('event', {
    state: () => ({ 
        eventList: [] as WorldEvent[], 
        currentEventID: 0,
        currentEventDishList: [] as Dish[]
    }),
    getters: {
        getEvents: (state) => state.eventList,
        getCurrentEvent: (state) => {
          return state.eventList.find( e => e.id === state.currentEventID);
        }
    },
    actions: {
      updateEventList() {
        const eventsRef = ref(firebaseDB, 'events/');
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            this.eventList = (data as WorldEvent[]).filter(e => e !== undefined);
          });
      },

      updateIDAndDishes(newID: number){
        this.currentEventID = newID;

        const dishesRef = ref(firebaseDB, 'events/'+this.currentEventID+'/dishes');
        onValue(dishesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.currentEventDishList = (data as Dish[]).filter(e => e !== undefined);
          } else {
            this.currentEventDishList = []
          }
        });
      },

      addADish(newDish: Dish){
        const dishCount = this.currentEventDishList.length + 1;
        set(ref(firebaseDB, 'events/' + this.currentEventID + '/dishes/' + dishCount), newDish);
      },

      updatePeopleCount(newTotal: number){
        set(ref(firebaseDB,
          'events/' + this.currentEventID + '/peopleCount'),
          newTotal);
      }
    },
  });
