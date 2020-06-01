<template>
  <div id="app">
    <!--路由容器 基于slot进行封装的  根据url路径显示不同的路由组件-->
    <transition name='app' mode="out-in">
       <router-view></router-view>
    </transition>
    <Tabbar v-show='isTabbarShow'></Tabbar>
  </div>
</template>

<script>
import Tabbar from 'con/Tabbar'
import { mapState } from 'vuex'
export default {
  components: {
    Tabbar
  },
  computed: {
    ...mapState('tabbar', ['isTabbarShow'])
  }
}
</script>
<style lang='scss'>
*{
    margin: 0;
    padding: 0;
}
  ul,li{
    list-style: none
}
    .app-enter-active{
      animation: move .5s;
    }
    .app-leave-active{
      animation: move .5s reverse;
    }

    @keyframes move{
      0%{
        opacity: 0;
        transform: translateY(50px)
      }
      100%{
        opacity: 1;
        transform: translateY(0px)
      }
    }

</style>
