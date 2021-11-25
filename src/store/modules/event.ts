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
        console.debug("setEvents state: ", events);
        state.events = events
    },
}
const actions = {
    //TODO: if events throw an error do not update it
    updateEvents({ commit }): void {
        const events = getEvents()
        console.debug("action updateEvents got response: ", events);
        commit('setEvents', events);
    },
}
const getters = {
    events: state => {
        console.debug("getting events from events getter")
     return state.events
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
