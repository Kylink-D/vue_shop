import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // 如果用户访问的是 login 页面， 直接放行
  if (to.path === '/login') return next()
  // 拿到浏览器的 sessionStorage 的 token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有 token 跳转登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
