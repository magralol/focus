import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from './store'

import App from './components/app.vue'
import Home from './components/home.vue'
import Feed from './components/feed.vue'

require('../scss/style.scss');

firebase.initializeApp({
  apiKey: "AIzaSyDAqs8NWnGU1kmmJBtb1PUGXE7chTMG-eY",
  authDomain: "focus-d0b14.firebaseapp.com",
  databaseURL: "https://focus-d0b14.firebaseio.com",
  projectId: "focus-d0b14",
  storageBucket: "focus-d0b14.appspot.com",
  messagingSenderId: "850110927476"
});

Vue.use(VueRouter);

new Vue({
  el: '#app',
  store: store,
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/', component: Home },
      { path: '/feed', component: Feed }
    ]
  }),
  render: h => h(App)
})