import User from '@/types/User'
import { authGoogle } from '@/api/auth'

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
  googleAuth({ commit }, idToken: string): Promise<void> {
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
  logout({ commit }) {
    commit('setUser', null)
    commit('setAuth', false)
  },
}
const getters = {
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
