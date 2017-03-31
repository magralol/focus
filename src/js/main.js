import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/app.vue'
import Home from './components/home.vue'
import Feed from './components/feed.vue'

require('../scss/style.scss');

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/', component: Home },
      { path: '/feed', component: Feed }
    ]
  }),
  render: h => h(App)
})
