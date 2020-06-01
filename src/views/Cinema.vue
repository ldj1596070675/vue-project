<template>
  <div class="cinema">
    <div class="head">
      <div class="left" @click="handleChangePage('/city')">{{cityName}}</div>
      <div class="yiyuan">影院</div>
      <div class="right" @click="handleChangePage('/cinema/search')"><i class="iconfont icon-shousuo1"></i></div>
    </div>
    <div class="select">
      <div :class="isAreaShow?'active':''" @click="onClick" :isMask='isMask'>{{current}}</div>
      <div>App订票</div>
      <div>最近去过</div>
    </div>
    <div class="area" v-show="isAreaShow">
      <ul>
        <li
          v-for="data in areaList"
          :key="data"
          @click="handleArea(data)"
          :class="{active:data === current}"
        >{{data}}</li>
      </ul>
    </div>
    <div class="content" :style="{height:scrollHeight , overflow:'hidden'}">
      <ul>
        <CinemaItem
          v-for="data in computedDatalist"
          :key="data.cinemaId"
          :data='data'
          @click.native="TofmDel(data.cinemaId)"
        ></CinemaItem>
      </ul>
    </div>
    <div class="mask" v-show="isMask"></div>
  </div>
</template>

<script>
import CinemaItem from './Cinema/CinemaItem'
import { mapState, mapActions, mapMutations } from 'vuex'
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  components: {
    CinemaItem
  },
  data () {
    return {
      isAreaShow: false,
      current: '全城',
      isMask: false,
      scrollHeight: 0
    }
  },
  mounted () {
    this.scrollHeight = document.documentElement.clientHeight - 92 - 50 + 'px'
    // console.log(document.documentElement.clientHeight)
    // 实例化
    new BetterScroll('.content', {
      scrollbar: {
        fade: true
      },
      click: true // 允许设置点击事件
    })
  },
  methods: {
    TofmDel (cinemaId) {
      this.$router.push(`/cinema/${cinemaId}/filmDel`)
    },
    handleArea (data) {
      this.current = data
      this.isAreaShow = false // 弹窗消失
      this.isMask = false
    },
    onClick () {
      this.isAreaShow = true
      this.isMask = true
    },
    handleChangePage (path) {
      if (path === '/city') {
        // 当用户选择切换城市的时候，将vuex里面的cinemaList状态清空
        this.setCinemaList([])
      }
      this.$router.push(path)
    },
    ...mapActions('cinema', ['getCinemaActions']),
    ...mapMutations('cinema', ['setCinemaList'])
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapState('city', ['cityName', 'cityId']),
    // 所有区域的计算属性
    areaList () {
      // 获取所有城市的所有区域
      const newarr = this.cinemaList.map(item => item.districtName)
      // 利用set去重
      const arealist = ['全城', ...Array.from(new Set(newarr))]
      return arealist
    },
    // 根据current区域，过滤出相应区域的影城
    // 例如选择是金山区区域，那么数组过滤出新的数组，这个新数组里面全部放着就是金山区的所有的影院了
    computedDatalist () {
      if (this.current === '全城') return this.cinemaList
      return this.cinemaList.filter(item => item.districtName === this.current)
    }
  },
  created () {
    const toast = Toast.loading({
      message: '数据加载中',
      forbidClick: true,
      duration: 0,
      overlay: true
    })
    if (this.cinemaList.length > 0) {
      toast.clear()
    } else {
      this.getCinemaActions(this.cityId).then(res => {
        toast.clear()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  border:1px solid orange!important;
  color:orange;
}
    .cinema{
      width: 100%;
      background: #ffffff;
       .area{
        position: fixed;
        top: 0.92rem;
        left: 0;
        width: 100%;
        z-index: 12;
        background: #fff;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width:19%;
                padding: 0.05rem;
                border:1px solid #f4f4f4;
                text-align: center;
                margin:0.05rem;
                font-size: 0.14rem;
            }
        }
    }
    .head{
      padding:0 0.1rem;
      height: 0.44rem;
      line-height: 0.44rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      border-bottom: 1px solid #f5f5f5;
      width: 100%;
      z-index: 10;
      background: #ffffff;
      div{
        flex: 1;
        text-align: center;
        color: #191a18;
      }
      .left{
        text-align: left;
        font-size: 0.14rem;
      }
      .right{
        text-align: right;
         font-size: 0.14rem;
      }
      .yiyuan{
        font-size: 0.18rem;
      }
    }
    .select{
      font-size: 0.14rem;
      color: #191a18;
      position: fixed;
      top: 0.44rem;
      left: 0;
      background: #ffffff;
      z-index: 10;
      display: flex;
      width: 100%;
      height: 0.48rem;
      line-height: 0.48rem;
      border-bottom: 1px solid #f5f5f5;
      div{
        flex: 1;
        text-align: center;
      }
    }
    .content{
      position: relative;
      top:92px;
      left: 0;
      }
    }
    .mask {
      width:100%;
      height:1200px;
      background:gray;
      position:fixed;
      top:0.92rem;
      left:0;
      z-index:11;
      opacity:0.6;
    }
</style>
