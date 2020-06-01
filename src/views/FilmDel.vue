<template>
    <div class="filmdel">
        <div class="headdel">
            <i class="iconfont icon-fanhui" @click="back"></i>
        </div>
        <div class="title">{{fimlDel.name}}</div>
        <ul class="tags" v-if="fimlDel.services">
            <li
                v-for="data in fimlDel.services"
                :key="data.name"
            >{{data.name}}</li>
            <i class="iconfont icon-xiayiye"></i>
        </ul>
        <div class="adrss">
            <i class="iconfont icon-buoumaotubiao23"></i>
            <P>{{fimlDel.address}}</P>
            <i class="iconfont icon-kefurexianxianxing"></i>
        </div>
        <div class="schedule-wrap"
          v-for="(item,index) in dataFilml"
          :key="item.filmId"
        >
            <div class="bg">
                <div class="img"
                :style="{backgroundImage: 'url('+item.poster+')'}"></div>
            </div>
            <div class="film-list">
              <Swiper cName='poster'>
                <div
                class="swiper-slide"
                v-swiper="{
                  curr: index,
                  length:dataFilml.length,
                  swipe: 'poster',
                  free: {
                      slidesPerView: 3.8,
                      spaceBetween: 16,
                      centeredSlides: true
                    }
                  }"
                >
                <div class="film-item">
                  <div class="img-wap">
                     <img :src="item.poster" />
                  </div>
                </div>
                </div>
              </Swiper>
              <div class="triangle">
               <img width="20px" height="10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEVHcEz////////mcEUwAAAAAnRSTlMAgJsrThgAAABLSURBVAgdBcEBDQAACAMg/GYDAxnB/mkEUAuBPgjMQOAagtpaBM0hGAbB0Qi11BIajjAwhIMmaqFWNHBigBEHtNQCtWmAywBMDqAfx4oGipkmrUEAAAAASUVORK5CYII=" />
             </div>
            </div>
            <div class="film-info" @click="cliToDel(item.filmId)">
              <div class="film-head">
                <span class="film-name">{{item.name}}</span><span class="film-score">{{item.grade}}</span><span class="film-unit">分</span>
              </div>
              <div class="film-desc">
              <span>{{item.category}}</span> |
              <span>{{item.runtime}}分钟</span> |
              <span>{{item.director}}</span> |
              <span
                v-for="data in item.actors"
                :key="data.filmId"
              >{{data.name}} </span>
              </div>
              <img class="film-more" width='4px' height='8px' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAMAAAD57OxYAAAAZlBMVEVHcEwZGhseHh4aGh8zMzMZGhsZGhwZGhsfHx8ZGhsbGxsZGhsZGxsZGxsZGxsZGxsbGxsaGhsaGh0aGh0ZGhwbGxsZGhweHh4ZGhsaGh0ZGxsZGxsZGxsZGhsZGxsZGxsaGhwZGhtuA7MxAAAAIXRSTlMA6iE5Bda99xD+OOWenXh6VddWV9BxviLpe7x5jeSBgI/e7hU0AAAAeUlEQVQY023PyRqCMAyFUSilA2VGnBX/939JN01QP7O6Z5ObFGt6FjoPuCjuEBeBvYKvRKGG8iQyZ5iCqPFwtKIxQqsre2BQdV8F7rfgoJh2WAe+yWghjjkPQJ/zHKHLufLg8jmmhDp8vGD+LH1BnKU6wU3vXdOm+Q34ngmHHMc+eAAAAABJRU5ErkJggg=="/>
            </div>
            <div class="date-list">
              <div class="time">
                {{item.showDate | dateFilter2}}
              </div>
              <div class="foot">
                <div class="img">
                  <img src="data:image/png;base64,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" />
                </div>
                <p>暂无场次</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { instance } from '@/utils/http-axios'
import Swiper from '@/components/Swiper'
import { mapMutations } from 'vuex'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      fimlDel: [],
      dataFilml: []
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    back () {
      this.$router.back()
    },
    cliToDel (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  created () {
    instance.get(`/gateway/?cinemaId=${this.$route.params.id}&k=3344674`, {
      headers: {
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      // console.log(res.data.data.cinema)
      this.fimlDel = res.data.data.cinema
    })
    instance.get(`/gateway/?cinemaId=${this.$route.params.id}&k=767708`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.dataFilml = res.data.data.films
    })
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
.filmdel{
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .headdel{
        width: 100%;
        height: 0.44rem;
        line-height: 0.44rem;
        padding-left: 0.15rem;
        font-size: 0.16rem;
        position: fixed;
        top: 0;
        left: 0;
        background: #ffffff;
        box-sizing: border-box;
        z-index: 10;
    }
    .title{
        width: 100%;
        font-size: 0.18rem;
        height: 0.44rem;
        line-height: 0.44rem;
        padding: 0 0.15rem;
        text-align: center;
        background: #ffffff;
        margin-top: 0.44rem;
        box-sizing: border-box;
    }
    .tags{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #ffb232;
        overflow: hidden;
        padding: 5px 0 15px;
        position: sticky;
        top: 0.30rem;
        background: #ffffff;
        li{
            position: relative;
            padding: 0 6px;
            margin: 0 2.5px;
            font-size: 10px;
            box-sizing: border-box;
            border: 1px solid #ffb232;
        }
        i{
            margin-left: 5px;
            font-size: 0.1rem;
        }
    }
    .adrss{
        font-size: 0.14rem;
        display: flex;
        align-content: center;
        padding: 0 0.15rem;
        height: 0.5rem;
        line-height: 0.5rem;
          box-sizing: border-box;
        p{
            width: 2.47rem;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding:0 0.15rem;
            color: #2c3e50;
        }
        i{
            font-size: 0.22rem;
        }
    }
    .schedule-wrap{
        position: relative;
        .bg{
            position: absolute;
            top: 0;
            height: 1.3rem;
            width: 100%;
            padding: 0.15rem 0;
            overflow: hidden;
            .img{
                height: 100%;
                width: 100%;
                filter: blur(30px);
                -webkit-filter: blur(30px);
            }
        }
        .film-list{
          height: 130px;
          padding: 15px 0;
          position: relative;
            .film-item{
              padding-top: 0;
              display: flex;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              height: 100%;
              width: 100%;
              .img-wap{
                  width: 90px;
                  height: 130px;
                    img{
                    width: 100%;
                    height: 100%;
                  }
              }
          }
          .triangle{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            top:5px;
          }
        }
        .film-info{
          width: 100%;
          background: #fff;
          height: 50px;
          padding: 15px 0;
          position: relative;
          .film-head{
            width: 100%;
            height: 20px;
            margin-bottom: 10px;
            text-align: center;
            line-height: 20px;
            .film-name{
              position: relative;
              top: -35px;
              left: 0;
              font-size: 15px;
              color: #191a1b;
              padding-right: 5px;
            }
            .film-score{
              position: relative;
              top: -35px;
              font-size: 16px;
              font-style: italic;
              color: #ffb232;
            }
            .film-unit{
              position: relative;
              top: -35px;
              font-size: 10px;
              color: #ffb232;
            }
          }
          .film-desc{
            text-align: center;
            height: 18px;
            color: #797d82;
            font-size: 13px;
            padding: 0 12%;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .film-more{
            position: absolute;
            right: 15px;
            top: 0;
            margin-top: 36px;
          }
        }
        .date-list{
            width: 100%;
            overflow: hidden;
            .time{
              height: 0.3rem;
              padding: 0.1rem 0 0.1rem 0.15rem;
              font-size: 0.17rem;
              line-height: 0.3rem;
              color: #ff5f16;
              border-top: 1px solid #edeef0;
              border-bottom: 1px solid #edeef0;
            }
            .foot{
              width: 100%;
              height: 1.8rem;
              display: flex;
              flex-direction: column;
              text-align: center;
              .img{
                width: 0.7rem;
                height: 0.7rem;
                flex: 1;
                margin: 0 auto;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              p{
                flex: 1;
                color: #bdc0c5;
                font-size: 14px;
                margin-top: 0.3rem;
              }
            }
          }
    }
}
</style>
