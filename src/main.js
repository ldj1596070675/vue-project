import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载自定义指令文件directives
import '@/utils/directives'
import '@/utils/filter'
import '@/utils/rem'
import '@/utils/components'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router, // 为了让路由组件可以访问到this.$route 和 this.$router相关的路由api属性或方法
  store,
  render: h => h(App)
}).$mount('#app')
