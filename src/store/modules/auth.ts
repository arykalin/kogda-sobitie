import User from '@/types/User'

interface AuthState {
    mail: string;
    user: User;
    isAuth: boolean;
}

const state: AuthState = {
    mail: "",
    user: {},
    isAuth: false,
}
const mutations = {
    setMail(state, mail: string): void {
        state.mail = mail;
    },
    setUser(state, user: User): void {
        state.user = user
    },
    setAuth(state, auth: AuthState): void {
        state.isAuth = auth
    },
}
const actions = {
    saveUser({commit}, mail: string) {
        console.log("saving user mail to store ", mail)
        localStorage.setItem('mail', mail)
        commit('setMail', mail)
        commit('setAuth', true)
    },
    logout({commit}) {
        commit('setUser', null)
        commit('setAuth', false)
    },
}
const getters = {
    mail: (state) => state.mail,
    user: (state) => state.user,
    isAuth: (state) => state.isAuth,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
