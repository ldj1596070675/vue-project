<template>
  <div>
    <p>刚好看跟火锅</p>
  </div>
</template>

<script>
// 引入axios模块进行异步请求
// import axios from 'axios'
export default {
  created () {
    // 请求mei网站接口数据
    // axios.get('http://www.mei.com/appapi/silo/navigationAll/v3?timestamp=1585277590831&summary=38f67935ccedd58f5694ee8858365067')
    //   .then(res => {
    //     console.log(res)
    //   })
    // 请求maizuo的接口数据
    // axios.get('https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8497085', {
    //   headers: {
    //     // 将数据放在请求头上面携带给卖座接口
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15587791402160368550306","bc":"310100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    // axios完整版
    // axios({
    //   url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8497085',
    //   method: 'get',
    //   headers: {
    //     // 将数据放在请求头上面携带给卖座接口
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15587791402160368550306","bc":"310100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    // 请求猫眼电影数据  vue.config.js文件 devServer -> proxy
    // axios({
    //   url: '/api/ajax/movieOnInfoList?token=&optimus_uuid=C65FF030043711EAA90DB72AF81017842766AFA17B0B4FC182E45BB02A3963B2&optimus_risk_level=71&optimus_code=10',
    //   method: 'get'
    // }).then(res => {
    //   console.log(res)
    // })
  }
}
</script>
