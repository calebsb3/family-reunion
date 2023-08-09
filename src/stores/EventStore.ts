// stores/eventStore.ts
import { defineStore } from 'pinia';
import { WorldEvent } from '../models/interfaces'
import { ref, onValue } from "firebase/database";
import { firebaseDB } from "../helper/firebaseConfig";

export const useEventStore = defineStore('event', {
    state: () => ({ 
        eventList: [] as WorldEvent[], 
    }),
    getters: {
        getEvents: (state) => state.eventList,
    },
    actions: {
      updateEventList() {
        const eventsRef = ref(firebaseDB, 'events/');
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            this.eventList = (data as WorldEvent[]).filter(e => e !== undefined);
          });
      },
    },
  });
