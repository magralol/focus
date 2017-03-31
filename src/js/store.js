import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: null,
    error:{
      code: null,
      msg: null
    }
  },
  mutations: {
    SET_USER: function (state, user){
      state.user = user;
    },
    REMOVE_USER: function (state){
      state.user = null;
    },
    HANDEL_ERRORS: function (state, error) {
      state.error.code = error.code;
      state.error.msg = error.msg;
    }
  },
  actions: {
    registerUser: function (ctx, details) {

      firebase.auth().createUserWithEmailAndPassword(details.email, details.password).then(function(user) {
          var user = firebase.auth().currentUser;
           user.updateProfile({
              displayName: details.username,
           }).then(function() {
              console.log("user", user);
              ctx.commit("SET_USER", user);
           }, function(error) {
              console.log("update user error", error);
           });
      }, function(err) {
          console.log(err)
          ctx.commit("HANDEL_ERRORS", {code: err.code, msg: err.message});
      });
      
    },
    signOutUser: function (ctx) {
      firebase.auth().signOut().then(function() {
        ctx.commit("REMOVE_USER");
      }).catch(function(error) {
        console.log("Sign out error", error);
      });
    },
    signInUser: function (ctx, credentials) {
     firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(function(user) {
          var user = firebase.auth().currentUser;
          ctx.commit("SET_USER", user);
      }, function(err) {
          console.log(err)
          ctx.commit("HANDEL_ERRORS", {code: err.code, msg: err.message});
      });
    }
  }
});