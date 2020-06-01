<template>
  <div class="zzsx">
    <ul>
      <router-link
        v-for="data in dataList"
        :key="data.filmId"
        :to="{
          name: 'detail',
          params:{id:data.filmId}
        }"
        tag="li"
      >
      <img :src="data.poster"/>
      <div class="uLi">
        <p class="p1">{{data.name}}  <span>{{data.filmType.name}}</span></p>
        <p>观众评分 <b>{{data.grade}}</b></p>
        <p class="p3">主演: {{data.actors | actorFilter}}</p>
        <p>{{data.nation}} | {{data.runtime}}分钟</p>
      </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { instance } from '@/utils/http-axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  created () {
    instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=8497085`,
      {
        headers: {
          // 将数据放在请求头上面携带给卖座接口
          'X-Host': 'mall.film-ticket.film.list'
        }
      }
    ).then(res => {
      this.dataList = res.data.data.films
      // console.log(res.data.data)
    })
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style lang='scss' scoped>
*{
  padding: 0;
  margin: 0;
}
ul{list-style: none;
   li{
      overflow: hidden;
      padding: 0.15rem;
     img{
        width: 0.66rem;
        height: 0.91rem;
        display: block;
        float: left;
    }
    .uLi{
        margin-left: 0.7rem;
        padding-left: 0.05rem;
        margin-top: 0.03rem;
        .p1{
          font-size: 0.16rem;
          color: #191a1b;
        }
        .p3{
           overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        b{
          color: #ffb232;
          font-size: 0.14rem;
        }
        p{
          height: 0.16rem;
          line-height: 0.16rem;
          font-size: 0.13rem;
          color: #797d82;
          margin-bottom: 0.05rem;
        span{
          padding: 0 0.02rem;
          font-size: 0.12rem;
          background:#d2d6dc;
          border-radius: 0.02rem;
          color: #ffffff;
          }
        }
    }
   }
}
</style>
