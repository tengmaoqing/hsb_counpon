import Vuex from 'vuex';

/* eslint-disable no-param-reassign */
const store = new Vuex.Store({
  state: {
    currentForm: null,
  },
  mutations: {
    setCurrentForm(state, { form }) {
      state.currentForm = form;
    },
  },
});

export default store;
