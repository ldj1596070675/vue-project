<template>
     <nav>
      <ul>
        <router-link
          v-for="nav in navlist"
          :key="nav.id"
          :to="nav.path"
          tag="li"
          active-class="active"
        >
        <i class="iconfont" :class="nav.icon"></i>
        <span>{{nav.title}}</span>
        </router-link>
      </ul>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      navlist: [
        { id: 1, title: '电影', path: '/flims', icon: 'icon-dianying' },
        { id: 2, title: '影院', path: '/cinema', icon: 'icon-yingyuan' },
        { id: 3, title: '我的', path: '/center', icon: 'icon-icon03' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
    color:orange;
  }
  nav{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:0.5rem;
    z-index: 10;
     background: #ffffff;
    ul{
      display: flex;
      li{
        flex:1;
        line-height: 0.25rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        font-size: 0.12rem;
      }
    }
  }
</style>
