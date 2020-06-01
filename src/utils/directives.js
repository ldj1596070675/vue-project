import Vue from 'vue'
import Swiper from 'swiper'

Vue.directive('swiper', {
  inserted (el, binding, vnode) {
    // 代表最后一个元素插入完毕,再进行一次实例化操作
    if (binding.value.curr === binding.value.length - 1) {
      new Swiper('.' + binding.value.swipe, {
        ...binding.value.free,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
})

// 封装的自定义指令v-title
Vue.directive('title', {
  // 插入到dom之后的钩子函数
  inserted (el, binding) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
