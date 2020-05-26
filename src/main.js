import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Message } from 'element-ui'

import './assets/style/base.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.$Message = Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
