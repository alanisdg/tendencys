import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate' 
Vue.use(Vuelidate)
import VueRouter  from 'vue-router';
import 'bootstrap/scss/bootstrap.scss'
import Routes from './routes.js';
Vue.use(VueRouter)

const router = new VueRouter({
  routes:Routes
})
window.axios = require('axios');
Vue.config.productionTip = false



import storeData from "../store/index.js"
import Vuex from 'vuex'
Vue.use(Vuex)

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


const store = new Vuex.Store(
   storeData
)



new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
