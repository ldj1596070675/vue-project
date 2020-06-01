import Vue from 'vue'
import moment from 'moment'
// 定义演员过滤器
Vue.filter('actorFilter', data => {
  if (data) {
    return data.map(item => item.name).join(' ')
  } else {
    return '暂无主演'
  }
})

// 定义日期的过滤器
Vue.filter('dateFilter', (data, option = '-') => {
  return moment(data * 1000).format('YYYY' + option + 'MM' + option + 'DD')
})

Vue.filter('dateFilter2', (data, option = ['月', '日']) => {
  return moment(data * 1000).format('MM' + option[0] + 'DD' + option[1])
})
