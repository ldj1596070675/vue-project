<template>
    <li>
        <div class="address">
        <div class="name">{{data.name}}</div>
        <p class="dizi">{{data.address}}</p>
        </div>
        <div class="price">
            <p class="lod"><i class="rmb">￥</i>{{data.lowPrice / 100}} <span class="qian">起</span></p>
            <p class="juli">距离未知</p>
        </div>
    </li>
</template>

<script>
export default {
  props: ['data']
}
</script>
<style lang='scss' scoped>
      i{font-style: normal}
      li{
        padding: 0.1rem;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        .address{
          width: 2.8rem;
          height: 0.45rem;
          padding-right: 0.15rem;
          .name{
            font-size: 0.15rem
          }
          .dizi{
            width: 2.12rem;
            font-size: 0.12rem;
            margin-top: 0.05rem;
            color: #797d82;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .price{
          height: .45rem;
          font-size: 0.15rem;
          color: #ff5f16;
          .lod{
            width: 0.7rem;
            .rmb{
             font-size: 0.1rem;
          }
           .qian{
             font-size: 0.1rem;
            }
          }
          .juli{
            font-size: 0.11rem;
            margin-top: 0.05rem;
            color: #797d82;
          }
        }
      }
</style>
