import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'

export default createStore({
  modules,
  plugins: [createPersistedState(), createLogger()],
})
