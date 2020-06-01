import Vue from 'vue'
import VueRouter from 'vue-router'

// 这行代码如果注释掉，this上面都不存在$router与$route的api了
// 引入Flims组件
import Flims from '@/views/Flims'
// import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import zzsx from '@/views/flims/zzsx'
import Jjsx from '@/views/flims/Jjsx'
import Error from '@/views/Error'
import Detail from '@/views/Detail'
Vue.use(VueRouter)
const routes = [
  {
    path: '/flims',
    component: Flims,
    // 进行二级路由的配置
    children: [
      {
        path: '/flims/zzsx',
        component: zzsx
      },
      {
        path: '/flims/jjsx',
        component: Jjsx
      },
      {
        path: '',
        redirect: '/flims/zzsx'
      }
    ]
  },
  {
    path: '/cinema',
    component: () => import('@/views/Cinema')
  },
  {
    path: '/cinema/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/cinema/:id/filmDel',
    component: () => import('@/views/FilmDel')
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    path: '*',
    component: Error
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail,
    props: true
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/flims'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 判断每次路由切换的时候，是否有token令牌
router.beforeEach((to, form, next) => {
  if (to.path === '/center') {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
