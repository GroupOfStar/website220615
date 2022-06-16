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
  // {
  //   path: '/login',
  //   name: 'dmLogin', // 登录页
  //   component: () => import('../views/Login'),
  // },
  // {
  //   path: '/main',
  //   component: () => import('../components/Main'),
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/main/project',
  //     },
  //     {
  //       path: '/main/project',
  //       name: 'dmProject', // 首页产品
  //       component: () => import('../views/Project'),
  //     },
  //     {
  //       path: '/main/example',
  //       name: 'dmExample', // 案例中心
  //       component: () => import('../views/Example'),
  //     },
  //     {
  //       path: '/main/solution',
  //       name: 'dmSolution', // 解决方案
  //       component: () => import('../views/Solution'),
  //     },
  //     {
  //       path: '/main/dict',
  //       name: 'dmDict', // 字典管理
  //       component: () => import('../views/Dict'),
  //     },
  //     {
  //       path: '/main/setting',
  //       name: 'dmSetting', // 系统设置
  //       component: () => import('../views/Setting'),
  //     },
  //   ],
  // },
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
