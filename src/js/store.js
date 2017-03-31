import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    ADD_VAL (state) {
      state.count++;
    }
  },
  actions: {
    increment: function (ctx) {
      ctx.commit("ADD_VAL");
    }
  }
});