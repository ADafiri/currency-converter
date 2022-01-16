import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    conversionHistory: [],
  },
  mutations: {
    setConversionHistory(state, newValue) {
      state.conversionHistory.push(newValue);
    },
    deleteConversionHistory(state, index) {
      if (index > -1) {
        state.conversionHistory.splice(index, 1);
      }
    },
  },
  actions: {
    setConversionHistory({ commit, state }) {
      commit("setConversionHistory", state);
    },
    deleteConversionHistory({ commit, state }) {
      commit("deleteConversionHistory", state);
    },
  },
})
