import Vuex from 'vuex';

/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
const store = new Vuex.Store({
  state: {
    domProps: {},
  },
  mutations: {
    updateDomProps(state, props) {
      state.domProps = props;
    },
  },
});

export default store;
