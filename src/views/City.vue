<template>
    <div class="city">
      <div class="head">
        <div class="letf" @click="fanhui"><i class="iconfont icon-guanbi"></i></div>
        <div class="title">当前城市 - </div>
      </div>
      <form action='/' class="form">
        <van-search
          background='#f4f4f4'
          v-model="value"
          show-action
          autofocus='true'
          placeholder="请输入搜索关键词"
        />
      </form>
      <!-- <div v-show="value">
         <ul v-if="searchDatalist.length">
          <li
            class="Li"
            v-for="ta in searchDatalist"
            :key="ta.list.cityId"
            :ta="ta"
          >
         {{ta.list.name}}
          </li>
        </ul>
      </div> -->
       <van-index-bar class="bar" :index-list="indexList">
            <div
                v-for="(data,index) in dataList"
                :key="index"
            >
                <van-index-anchor :style="{background:'#f4f4f4'}"  :index="data.index" />
                <van-cell @click="handleClick(item)" :key="index" v-for="(item,index) in data.list"  :title="item.name" />
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import { instance } from '@/utils/http-axios'
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Search } from 'vant'
import { mapMutations } from 'vuex'
Vue.use(IndexBar).use(IndexAnchor).use(Cell).use(Search)
export default {
  data () {
    return {
      dataList: [],
      indexList: [],
      value: ''
    }
  },
  created () {
    instance('/gateway?k=6077446', {
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
    //   console.log(res.data.data.cities)
      this.dataFilter(res.data.data.cities)
    })
  },
  methods: {
    ...mapMutations('city', ['setCityName', 'setCityId']),
    ...mapMutations('tabbar', ['hide', 'show']),
    handleClick (item) {
      this.setCityName(item.name)
      this.setCityId(item.cityId)
      this.$router.back()
    },
    fanhui () {
      this.$router.back()
    },
    dataFilter (cities) {
      const letterArr = []
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      // console.log('letterArr', letterArr)
      // filtr 遍历26个字母，跟cities数据.pinyin.首字母.大写 进行过滤
      var cityArr = []
      for (var j = 0; j < letterArr.length; j++) {
        const tempArr = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j])
        if (tempArr.length > 0) {
          cityArr.push({
            index: letterArr[j],
            list: tempArr
          })
          this.indexList.push(letterArr[j])
        }
      }
      this.dataList = cityArr
      // console.log(this.dataList)
    }
  },
  mounted () {
    this.hide()
  },
  destroyed () {
    this.show()
  }
}
</script>

<style lang='scss' scoped>
.city{
  overflow: hidden;
  .head{
      width: 100%;
      font-size: 0.17rem;
      height: 0.44rem;
      line-height: 0.44rem;
      padding: 0 0.1rem;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      background: #ffffff;
      .title{
        flex: 1;
        text-align: center
      }
    }
    .form{
      width: 100%;
      position: fixed;
      top: 0.44rem;
      left: 0;
      z-index: 10;
    }
     .Li{
        background: #ffffff;
        position: relative;
        top:0.88rem;
        left: 0;
        padding: 0.15rem;
        font-size: 0.12rem;
        border-bottom: 1px solid #f5f5f5;
      }
    .bar{
      position: relative;
      top: 1.2rem;
      left: 0;
    }
}
</style>
