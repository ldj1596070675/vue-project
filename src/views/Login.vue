<template>
    <div class="login">
        <div class="logo">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
        </div>
        <div class="login-from" :style="{ margin: '0 .15rem'}">
            <form @submit.prevent="login">
                <van-field v-model="username" label="用户名" placeholder="用户名" />
                <van-field v-model="password" type="password" label="密码" placeholder="密码"/>
                <van-button
                type="primary"
                size='large'
                color='#ff5f16'
                >
                登录</van-button>
            </form>
        </div>
    </div>
</template>

<script>
import { instance2 } from '@/utils/http-axios'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { Button, Field, Form, Dialog } from 'vant'
Vue.use(Button).use(Field).use(Form).use(Dialog)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    login () {
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({
          message: '用户名或者密码必须要传！',
          closeOnClickOverlay: true
        })
        return
      }
      instance2.post('/api/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        // 将token保存到本地
        localStorage.setItem('token', res.token)
        // 跳转到个人中心
        this.$router.push('/center')
      }).catch(err => {
        Dialog({ message: err, closeOnClickOverlay: true })
      })
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
.logo{
    margin: 79px auto 40px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    img{
        height: 60px;
    }
}
</style>
