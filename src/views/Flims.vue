<template>
  <div class="flims">
    <div class="city-fixed" @click="handleChangePage">
      <span>{{cityName}}</span>
      <i class="iconfont icon-xia" :style="{fontSize: '10px'}"></i>
    </div>
    <Swiper cName="swipe" class="swpi">
      <div
        class="swiper-slide"
        v-for="(bann,index) of banners"
        :key="bann.bannerId"
        v-swiper="{
          curr:index,
          length:banners.length,
          swipe:'swipe',
          free:{
            autoplay:true
          }
          }"
      >
      <img :src='bann.imgUrl' alt="">
      </div>
    </Swiper>
    <ul class="nav">
      <router-link active-class="active" tag='li' to="/flims/zzsx">正在热映</router-link>
      <router-link active-class="active" tag='li' to="/flims/Jjsx">即将上映</router-link>
    </ul>
    <router-view></router-view>
    <div class="no-more">-无更多电影-</div>
  </div>
</template>

<script>
// 引入Swiper组件
import Swiper from '@/components/Swiper'
import { instance } from '@/utils/http-axios'
import { mapState } from 'vuex'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      banners: []
    }
  },
  methods: {
    handleChangePage () {
      this.$router.push('/city')
    }
  },
  computed: {
    ...mapState('city', ['cityId', 'cityName'])
  },
  created () {
    // 请求数据
    instance.get(`/gateway?type=2&cityId=${this.cityId}&k=3419992`, {
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      this.banners = res.data.data
      // console.log(this.banners)
    })
  }
}
</script>
<style lang='scss' scoped>
*{padding: 0;margin: 0;}
.active{
  color: #ff5f16;
}
.flims{
  background: #fff;
  overflow: hidden;
  .city-fixed{
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0,0,0,.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;
  }
.swiper-slide{
  height: 2.1rem;
  img{
    width: 100%;
  }
}
.nav{
  display: flex;
  li{
    flex: 1;
    text-align: center;
    font-size: 0.14rem;
    padding: .15rem;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 0.1rem;
  }
}
.no-more{
    height: 59px;
    background-color: #ededed;
    color: #bdc0c5;
    font-size: 13px;
    text-align: center;
    margin: auto;
    line-height: 59px;
 }
}
</style>
