import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'

import store from './store'

import App from './components/app.vue'
import Home from './components/home.vue'
import Feed from './components/feed.vue'
import Profile from './components/profile.vue'
import Settings from './components/settings.vue'


require('../scss/style.scss');

Vue.use(VueRouter);

function checkAuth(to, from, next) {
    if(localStorage.getItem("token")){
      axios.get('/auth/check').then((res) =>{
        next();
      }).catch((err) => {
        if(err.response){
          router.push({path:"/"});
        }
      });
    }else{
      router.push({path:"/"});
    }
}

var router = new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/feed', name: 'feed', component: Feed, beforeEnter: checkAuth },
      { path: '/tag/:tag', name: 'tag', component: Feed, beforeEnter: checkAuth },
      { path: '/user/:username', name: 'profile', component: Profile, beforeEnter: checkAuth },
      { path: '/settings', name: 'settings', component: Settings, beforeEnter: checkAuth },
      { path: '*', redirect: '/' }
    ]
});

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});