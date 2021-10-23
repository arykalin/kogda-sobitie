import User from '@/types/User'
import {getAuth} from "@/api/getAuth";

interface AuthState {
    user: User;
    isAuth: boolean;
}

const state: AuthState = {
    user: {},
    isAuth: false,
}

const mutations = {
    setUser(state, user: User): void {
        state.user = user
    },
    setAuth(state, auth: AuthState): void {
        state.isAuth = auth
    },
}
const actions = {
    backendAuth({ commit }, idToken: string): void {
        console.log("getting user id with token ", idToken)
        getAuth(idToken)
            .then((res) => {
                console.log("got response ", res)
                localStorage.setItem('token', res.data.token)
                commit('setUser', res.data.userInfo)
                commit('setAuth', true)
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    logout({commit}) {
        commit('setUser', null)
        commit('setAuth', false)
        localStorage.removeItem('token')
    },
}
const getters = {
    user: state => {
        console.log("getting user from user getter")
        return state.user},
    token: (state) => state.token,
    isAuth: (state) => state.isAuth,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
