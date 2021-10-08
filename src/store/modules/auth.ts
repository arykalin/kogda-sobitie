import User from '@/types/User'

interface AuthState {
    mail: string;
    token: string;
    user: User;
    isAuth: boolean;
}

const state: AuthState = {
    mail: "",
    token: "",
    user: {},
    isAuth: false,
}
const mutations = {
    setToken(state, token: string): void {
        state.token = token;
    },
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
    saveUser({commit}, mail: string, token: string) {
        console.log("saving user mail to store ", mail)
        localStorage.setItem('mail', mail)
        localStorage.setItem('token', token)
        commit('setMail', mail)
        commit('setToken', token)
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
