import Event from '@/types/Event'
import {getEvents} from "@/api/getEvents";

interface EventState {
    events: Event[];
}

const state: EventState = {
    events: []
}

const mutations = {
    setEvent(state, event: Event): void {
        state.event = event
    },
}
const actions = {
    getEvents({ commit }): Event[] {
        console.log("getting events")
        const response = getEvents();
        commit('setEvent', true)
        return []
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
