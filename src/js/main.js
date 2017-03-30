import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/app.vue'
import Home from './components/home.vue'
import Test from './components/test.vue'

require('../scss/style.scss');

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/', component: Home },
      { path: '/test', component: Test }
    ]
  }),
  render: h => h(App)
})