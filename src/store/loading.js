import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    setLoading({ commit }, value) {
      commit('setLoading', value);
    }
  },
  getters: {
    loading: (state) => state.loading
  }
});
