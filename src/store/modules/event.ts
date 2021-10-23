import Event from '@/types/Event'
import {getEvents} from "@/api/getEvents";

interface EventState {
    events: Event[];
}

const state: EventState = {
    events: []
}

const mutations = {
    setEvents(state, events: Event[]): void {
        console.log("setEvents state: ", events);
        state.events = events
    },
}
const actions = {
    //TODO: if events throw an error do not update it
    updateEvents({ commit }): void {
        try {
            const events = getEvents()
            console.log("action updateEvents got response: ", events);
            commit('setEvents', events);
        }
        catch (e) {
            console.log(`error getting events in action updateEvents: ${e}`)
        }
    },
}
const getters = {
    event: (state) => state.events,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
