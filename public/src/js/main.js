import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from './store'

import App from './components/app.vue'
import Home from './components/home.vue'
import Feed from './components/feed.vue'
import Profile from './components/profile.vue'
import Settings from './components/settings.vue'


require('../scss/style.scss');
require('es6-promise').polyfill();

Vue.use(VueRouter);

new Vue({
  el: '#app',
  store: store,
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/feed', name: 'feed', component: Feed },
      { path: '/tag/:tag', name: 'tag', component: Feed },
      { path: '/user/:username', name: 'profile', component: Profile },
      { path: '/settings', name: 'settings', component: Settings }
    ]
  }),
  render: h => h(App)
});