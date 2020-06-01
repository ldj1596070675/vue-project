<template>
    <div class="detail" v-if="filmInfo">
      <m-title v-title='40' @back='handleBack'>
        {{filmInfo.name}}
      </m-title>
      <img :src="filmInfo.poster" />
      <div class="filmInfo-con">
        <div class="gh">
          <p class="film-title">{{filmInfo.name}} <em class="sp">{{filmInfo.filmType.name}}</em></p>
          <span>{{filmInfo.grade}}<b>分</b></span>
        </div>
        <div class="leixin">{{filmInfo.category}}</div>
        <p class="p2">{{filmInfo.premiereAt | dateFilter}}上映</p>
        <p>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</p>
        <div class="cont">
          <p :class="{synopsis:isActive}">{{filmInfo.synopsis}}</p>
          <i @click="isActive=!isActive" class="iconfont" :class="isActive?'icon-xia':'icon-shang'"></i>
        </div>
      </div>
      <div class="actor">
        <h4>演职人员</h4>
        <Swiper v-if='filmInfo.actors' cName="actors">
          <div
            v-for="(data,index) in filmInfo.actors"
            :key="data.id"
            class="swiper-slide ac"
            v-swiper="{
              curr:index,
              length:filmInfo.actors.length,
              swipe: 'actors',
              free: {
                slidesPerView: 4,
                spaceBetween: 15,
                freeMode: true
              }
            }"
          >
          <div class="actor-img">
            <img :src='data.avatarAddress' />
            <p>{{data.name}}</p>
            <p class="role">{{data.role}}</p>
          </div>
          </div>
        </Swiper>
        <div v-else class="zhanwu">暂无演职人员</div>
      </div>
      <div class="juzhao">
        <div class="juhead">
          <p>剧照</p>
          <p class="all" @click="isPhotoShow=true">全部({{ (filmInfo.photos ? filmInfo.photos:0) && filmInfo.photos.length}})></p>
        </div>
        <Swiper v-if="filmInfo.photos" cName="photos">
          <div
            v-for="(php,index) of filmInfo.photos"
            :key="php"
            class="swiper-slide jz"
            @click="previewImg(index)"
            v-swiper="{
              curr:index,
              length:filmInfo.photos.length,
              swipe:'photos',
              free:{
                slidesPerView: 2.4,
                spaceBetween: 15,
                freeMode: true
              }
            }"
          >
            <div>
              <img :src="php" />
            </div>
          </div>
        </Swiper>
        <div v-else class="zhanwu">暂无电影剧照</div>
        <Photo @event='previewImg' v-show="isPhotoShow" :list='filmInfo.photos'>
          <m-title @back='handlePhoto'>
            剧照({{(filmInfo.photos ? filmInfo.photos:0) && filmInfo.photos.length}})
          </m-title>
        </Photo>
      </div>
    </div>
</template>

<script>
import { instance } from '@/utils/http-axios'
import Swiper from '@/components/Swiper'
import Photo from './Detail/Photo'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  components: {
    Swiper,
    Photo
  },
  methods: {
    previewImg (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    handleBack () {
      this.$router.back()
    },
    handlePhoto () {
      this.isPhotoShow = false
    }
  },
  data () {
    return {
      filmInfo: null,
      isActive: true,
      isPhotoShow: false
    }
  },
  created () {
    instance.get(`/gateway?filmId=${this.$route.params.id}&k=8300462`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filmInfo = res.data.data.film
      // console.log(this.filmInfo)
    })
  }
}
</script>

<style lang="scss" scoped>
em{font-style: normal}
.zhanwu{
        background: #ffffff;
        font-size: 0.14rem;
        height: 1.4rem;
        line-height: 1.4rem;
        color: #797d82;
        text-align: center;
      }
.detail{
  overflow: hidden;
  .juzhao{
    width: 100%;
    padding-bottom: 0.1rem;
    background: #e9e8e8;
    margin-bottom: 0.65rem;
    .juhead{
      padding: 0.15rem;
      background: #ffffff;
      font-size: 0.14rem;
      display: flex;
      justify-content:space-between;
      .all{
        font-size: 0.12rem;
        color: #7d7982;
      }
    }
    .photos{
      background: #ffffff;
      padding-left: .15rem;
      .jz{
        width: 100%;
        padding-bottom: .15rem;
        img{
          width: 1.5rem;
          height: 1rem;
        }
      }
    }
  }
  .actor{
    width: 100%;
    padding: 0.1rem 0;
    background: #e9e8e8;
    h4{
      font-size: 0.18rem;
      padding: 0.15rem;
      background: #ffffff
      }
      .actors{
           background: #ffffff;
            padding-left: 0.15rem;
        .actor-img{
          font-size: 0.12rem;
          text-align: center;
          .role{
            font-size: 0.1rem;
            color: #7d7982;
            margin-top: 0.03rem;
          }
            img{
              width: 0.85rem;
              height: 0.85rem;
              display: block;
            }
          }
      }

  }
  .filmInfo-con{
    padding: 0.12rem 0.15rem 0.15rem;
    overflow: hidden;
    .leixin{
      height: 0.18rem;
      font-size: 0.12rem;
    }
    p{
      color: #797d82;
      font-size: 0.13rem;
    }
    .p2{
      margin: 0.05rem 0;
    }
    .leixin{
      color: #797d82;
      font-size:  0.13rem;
    }
    .cont{
      margin-top: 0.05rem;
      position: relative;
      i{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
        }
      .synopsis{
          height: 0.4rem;
          overflow: hidden;
      }
    }
    .gh{
        width: 100%;
        height: 0.26rem;
        line-height: 0.26rem;
        margin-bottom: 0.05rem;
        overflow: hidden;
        .film-title{
            width: 2.5rem;
            float: left;
            font-size: 0.18rem;
            color: #191a1b;
        .sp{
          font-size: 0.09rem;
          background:#d2d6dc;
          border-radius: 0.02rem;
          color: #ffffff;
          padding: 0 0.02rem;
          }
        }
        span{
          height: 0.26rem;
          float: right;
          color: #ffb232;
          font-size: 0.18rem;
          font-style: italic;
          b{
            font-size: 0.12rem;
            font-weight: normal;
            margin-left: 0.02rem;
          }
        }
    }
  }
  img{
   width: 100%;
   height: 2.5rem;
   display: block;
  }
 }
</style>
