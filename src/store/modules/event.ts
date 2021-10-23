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
        state.events = events
    },
}
const actions = {
    updateEvents({ commit }): void {
        const events = getEvents()
        console.log(`action updateEvents got response: ${events}`);
        commit('setEvents', events);
    },
}
const getters = {
    event: (state) => state.Event,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
