import Vue from 'vue'
import App from './App'
import router from './router'

import VeeValidate from 'vee-validate'

import "keen-ui/dist/keen-ui.css"
import KeenUI from 'keen-ui'

Vue.use(VeeValidate)
Vue.use(KeenUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
