import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

if(localStorage.getItem("token")){
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status == 401){
    window.location.href = "/";
    return Promise.reject(error);
  }
});

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
      state.posts = data;
    },
    setfilters: function(state, data) {
      state.filters = data;
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
      return axios.get('/post').then((res) =>{
        ctx.commit('setposts', res.data);
      })
      .catch((err) => {
        if(err.response){
          //TODO: real errors:
          console.log(err);
        }
      });
    },
    GET_POSTS_BY_TAG: function (ctx, payload) {
      axios.get('/post/tag/' + payload.tag)
      .then(function (res) {
        ctx.commit('setposts', res.data);
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
    },
    REMOVE_FILTER: function (ctx, payload) {
      axios.delete('/filter/' + payload.id).then(function (res) {
          ctx.commit('setfilters', res.data);
      }).catch(function (err) {
        //TODO: Real error handling
        console.log(err);
      });
    },
    GET_USER_NAME: function (ctx, payload) {
      /* Hacky way to get the username from a id for navigation */
      return axios.get('/username');
    },
    ACTIVATE_FILTER: function (ctx, payload) {
      //console.log(payload.id);
      axios.get('/filter/activate/' + payload.id).then(function (res) {
          ctx.commit('setfilters', res.data);
      }).catch(function (err) {
        //TODO: Real error handling
        console.log(err);
      });
    }
  }
});
