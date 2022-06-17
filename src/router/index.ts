import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nProgress from 'nprogress'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'stHome', // 首页
    component: () => import('../views/Home/index'),
  },
  {
    path: '/myself',
    name: 'stMyself', // 我自己
    component: () => import('../views/Myself/index'),
  },
  {
    path: '/login',
    name: 'stLogin', // 登录页
    component: () => import('../views/Login'),
  },
  {
    path: '/download',
    name: 'stDownload', // 下载页
    component: () => import('../views/Download'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  if (to.meta.loaded) return true
  nProgress.start()
  return true
})

router.afterEach(() => {
  nProgress.done()
  return true
})

export default router
