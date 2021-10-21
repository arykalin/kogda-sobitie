import Event from '@/types/Event'
import {getEvent} from "@/api/getEvent";
import {getEvents} from "@/api/getEvents";

interface EventState {
    events: Event;
}

const state: EventState = {
    events: [],
}

const mutations = {
    setEvent(state, event: Event): void {
        state.event = event
    },
}
const actions = {
    getEvents({ commit }): Event {
        console.log("getting events")
        const response = getEvents().catch((err) => {
            console.log('err', err)
        });
        commit('setEvent', true)
        return getEvent(idToken)
            .then((res) => {
                console.log("got response ", res)
                localStorage.setItem('token', res.data.token)
                commit('setEvent', true)
            })
            .catch((err) => {
                console.log('err', err)
            })
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
