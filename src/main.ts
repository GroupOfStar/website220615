import { createApp } from 'vue'
import App from './App'
import router from './router'
import store, { Key } from './store'
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'
import 'moment/dist/locale/zh-cn'
import watermark from './utils/watermark'

message.config({
  maxCount: 1,
})

createApp(App).use(store, Key).use(router).mount('#root')

setTimeout(() => {
  const root = document.getElementById('root')
  if (root) {
    watermark(root, {
      text1: 'zhangsan 2022-6-18 10:11 10.18.24.274',
      text2: '',
      color: 'black',
      fontSize: 24,
      space_x: 150,
      space_y: 120,
      width: 450,
      alpha: 0.1, // 透明度
    })
  }
}, 1000)
