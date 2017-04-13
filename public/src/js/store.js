import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: null,
    posts: [],
    error:{
      code: null,
      msg: null
    }
  },
  mutations: {
    SET_USER: function (state, user){
      state.user = user;
    },
    HANDEL_ERRORS: function (state, error) {
      state.error.code = error.code;
      state.error.msg = error.msg;
    },
    CLEAR_USER: function (state){
      state.user = null;
    },
    ADD_POSTS: function (state) {
      firebase.database().ref('posts').once('value').then(function(data) {
        let posts = [];
        var postdata = data.val(); 
        for(var post in data.val()){
          posts.push({user: postdata[post].user, body: postdata[post].body, date: postdata[post].date});
        }
        state.posts = posts;
      });
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
        ctx.commit("CLEAR_USER");
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
    },
    createPost: function (ctx, post) {
      firebase.database().ref('posts').push({
        user: post.user,
        body: post.body,
        date: Date.now()
      }, function (err) {
        if(err){
          ctx.commit("HANDEL_ERRORS", {code: err.code, msg: err.message});
        }else{
          ctx.commit("ADD_POSTS");
        }
      });
      //ctx.commit("ADD_POSTS");
    }
  }
});