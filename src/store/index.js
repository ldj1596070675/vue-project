import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinemamodule'
import tabbar from './module/tabbarmodule'
import city from './module/citymodule'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 实现了对于vuex的持久化存储
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city // 持久化字段就只有city字段了
      }
    }
  })],
  modules: { // 进行模块划分
    cinema, // 影院模块
    tabbar, // tabbar模块
    city // 城市模块
  }
})
export default store
