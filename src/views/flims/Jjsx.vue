<template>
    <div class="jjsx">
       <ul>
           <router-link
           :to="{
             name: 'detail',
             params:{id:data.filmId}
           }"
           tag="li"
           v-for='data of dList'
           :key="data.filmId"
           >
           <img :src="data.poster" />
           <div class="uLi">
            <p class="p1">{{data.name}}  <span>{{data.filmType.name}}</span></p>
            <p></p>
            <p class="p3">主演: {{data.actors | actorFilter}}</p>
            <p>上映日期: {{data.premiereAt | dateFilter}}</p>
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
      dList: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  created () {
    instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=7556879`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
    // console.log( res.data.data.films)
      this.dList = res.data.data.films
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
ul{
    list-style: none;
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
        width: 2.1rem;
        margin-left: 0.7rem;
        padding-left: 0.05rem;
        margin-top: 0.03rem;
        p{
          height: 0.16rem;
          line-height: 0.16rem;
          font-size: 0.13rem;
          color: #797d82;
          margin-bottom: 0.05rem;
        }
        .p1{
          font-size: 0.16rem;
          color: #191a1b;
          span{
          padding: 0 0.02rem;
          font-size: 0.12rem;
          background:#d2d6dc;
          border-radius: 0.02rem;
          color: #ffffff;
          }
        }
        .p3{
           overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
     }
  }
}
</style>
