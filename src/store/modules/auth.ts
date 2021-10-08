import User from '@/types/User'
import {authGoogle} from '@/api/auth'

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
    },
    googleAuth({commit}, idToken: string): Promise<void> {
        return authGoogle(idToken)
            .then((res) => {
                localStorage.setItem('token', res.token)
                commit('setUser', res.data.user)
                commit('setAuth', true)
            })
            .catch((err) => {
                console.log('err', err)
            })
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
