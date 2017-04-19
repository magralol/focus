import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    filters: [],
    activetag: null
  },
  getters: {
  },
  mutations: {
    setposts: function(state, data) {
      console.log("data: ", data);
      state.posts = data;
    },
    setfilters: function(state, data) {
      state.filters = data;
    },
    setactivetag: function (state, data) {
      state.activetag = data;
    }
  },
  actions: {
    SIGN_IN: function (cxt, payload) {
      return axios.post('/signin', {
        email: payload.email,
        password: payload.password
      });
    },
    SIGN_OUT: function (cxt) {
      localStorage.removeItem("token");
    },  
    REGISTER: function (ctx, payload) {
      return axios.post('/register', {
        email: payload.email,
        password: payload.password,
        username: payload.username
      });
    },
    GET_POSTS: function (ctx) {
      return axios.get('/post');
    },
    GET_POSTS_BY_TAG: function (ctx, payload) {
      axios.get('/post/tag/' + payload.tag)
      .then(function (res) {
        console.log(res.data);
        ctx.commit('setposts', res.data);
        ctx.commit('setactivetag', payload.tag);
      })
      .catch(function (err) {
        //TODO: Real error handling
        console.log(err);
      });
    },
    CREATE_POST: function (ctx, payload) {
      return axios.post('/post', {
        postbody: payload.body
      });
    },
    GET_USER: function (ctx, payload) {
      return axios.get('/user/' + payload.username);
    },
    GET_FILTERS: function (ctx, payload) {
      return axios.get('/filter');
    },
    CREATE_FILTER: function (ctx, payload) {
      return axios.post('/filter', {
        name: payload.name,
        tags: payload.tags.split(",")
      });
    },
    UPDATE_FILTER: function (ctx, payload) {
      return axios.put('/filter/' + payload.id, {
        name: payload.name,
        tags: payload.tags.split(",")
      });
    }
  }
});