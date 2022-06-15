# README

启动项目

## website220615

## 第 1 步 安装 `node.js 14`

https://nodejs.org/

## 第 2 步 安装和配置

```sh
# 改为淘宝npm镜像源
npm config set registry https://registry.npm.taobao.org/
```

## 第 3 步 启动项目

```sh
# 安装全部依赖，失败的话常识删除pnpm-lock.yaml
npm install
# 使用线上的接口字段运行项目， 本地使用npm run dev
npm run pro
```

## 文档

### 代码风格校验

注意：没有通过校验，无法提交代码。

1. husky git 钩子 https://typicode.github.io/husky/#/
2. @vuedx/typecheck ts 类型校验
3. eslint js 风格校验
4. prettier
5. stylelint css 风格校验 https://stylelint.io/user-guide/usage/cli
6. lint-staged 提交代码时，只会对修改的文件进行检查、修复处理，以保证提交的代码
   没有语法错误，不会影响其他人在更新代码无法运行的问题。
   https://www.npmjs.com/package/lint-staged

### Vue

1. Vue 前端框架 https://v3.cn.vuejs.org/
2. Vuex 前端状态管理 https://next.vuex.vuejs.org/
3. Vue-router 前端路由 https://next.router.vuejs.org/zh/introduction.html
4. @vueuse/core `vue hook`库 https://vueuse.org/core/useBreakpoints/
5. @vueuse/integrations `vue hook`对 axios、nprogress、qrcode 的封装
   https://vueuse.org/integrations/README.html
6. ant-design-vue UI 库 https://2x.antdv.com/components/menu-cn/

### 函数库

1. axios http 请求 https://github.com/axios/axios
2. tailwind css 工具库 https://tailwindcss.com/docs
3. lodash 函数库 https://lodash.com/docs/
4. dayjs 时间处理，`antdv 2`捆绑 moment，`antdv 3`将改用 dayjs
   https://dayjs.gitee.io/zh-CN/
5. moment 事件处理，等`antdv 3`发布后干掉
6. mitt 全局事件监听，`Vue3`不提供全局时间监听，需要用该库替代
   https://github.com/developit/mitt
7. nprogress 页面加载进度条，切换页面时使用
   https://github.com/rstacruz/nprogress

### 绘图库

1.  @antv/g2plot 图表库 https://antv-g2plot.gitee.io/zh/docs/manual/introduction
2.  @antv/g6 关系图连线 https://g6.antv.vision/zh/docs/manual/introduction
3.  @jsplumb/browser-ui `jsplumb 4`连线，基于 DOM，有些场景比 g6 更方便
    https://docs.jsplumbtoolkit.com/toolkit/current/index.html

### 其它库

有些项目使用，根据需求，选择安装使用。

1.  vuedraggable 拖拽库 https://github.com/SortableJS/vue.draggable.next
2.  @codemirror/basic-setup `codemirror 6`代码编辑器，实现 sql 编辑器
    https://codemirror.net/6/
3.  jsoneditor json 编辑器 https://github.com/josdejong/jsoneditor
4.  highlight.js 代码高亮，实现 sql 高亮
    https://github.com/highlightjs/highlight.js
5.  sql-formatter 格式化 sql 语句
    https://github.com/zeroturnaround/sql-formatter
6.  driver.js 新手引导库 https://kamranahmed.info/driver.js/

### 语法

1. typescript ts 语法 https://github.com/zhongsp/TypeScript
2. jsx vue 的 jsx 语法 https://github.com/vuejs/jsx-next
3. less 和`antdv`保持一致使用 less
   http://lesscss.org/features/#features-overview-feature
4. css module jsx 使用 css 的方法，替代 vue 单文件的 scoped 方式

### vite

1. vite 构建工具 https://cn.vitejs.dev/
2. vite-plugin-icons 图标插件，支持 95 组图标
   https://github.com/antfu/vite-plugin-icons
3. vite-svg-loader svg 插件，可以将 svg 文件当做 vue 组件引入
   https://github.com/jpkleemans/vite-svg-loader
4. vite-plugin-style-import `antdv`样式按需引入插件
5. @vitejs/plugin-vue vue 编译插件
6. @vitejs/plugin-vue-jsx jsx 处理插件

### 其它构建工具

1. postcss css 预处理器
2. Prettier 语法格式化

## vs code 拓展

### 智能提醒

1. vetur vue 智能提醒
2. Tailwind CSS IntelliSense tailwind 智能提醒
3. TypeScript Hero ts 智能提醒
4. TSLint ts 语法校验
5. Prettier 语法格式化

### 体验优化

1. GitLens git 加强
2. Remote - SHH 连接远程服务器
3. Code Spell Checker 变量名拼写检查
4. Bracket Pair Colorizer 2 括号高亮
5. vscode-icons 编辑器图标，增加辨识度
6. Image Preview 图片预览，可以直接在代码中预览，实用
7. SVG Viewer svg 查看工具
8. Markdown Preview Enhanced Markdown 阅读体验加强
9. Sort lines 文本排序工具
10. Remote - SSH 连接远程服务器
11. Partial Diff 文本比对

## 项目说明

### 目录结构

```
├─api 封装api文件
├─assets 静态资源文件
│  └─img 图片
├─common 通用代码
│  ├─enums ts枚举
│  ├─less 复用样式
│  ├─ts 复用ts
├─components 非业务组件
├─hooks vue hook函数
├─router 路由配置
├─store 状态管理
├─types ts类型声明
├─utils 复用js函数
└─views 页面代码
├─App.tsx 根页面
├─index.less 全局样式
└─main.ts 入口文件
```

### 框架基本功能点

- [x] index.html：添加 keywords，descriptions 的 meta 标签，从而优化 SEO；添加
      js 脚本在 IE 浏览器中提示只支持 Chrome/Edge/Firefox 浏览器
- [x] axios 类型和拦截器封装
- [x] vuex，vue-router 基础配置
- [x] 组件，头部，面包屑封装
- [x] utils 工具函数，封装下载文件
- [x] hook 函数
- [x] 通用页面：租户和用户管理、个人中心、数据源管理、首页、404 页面

### 兼容性

兼容 Chrome/Edge/Firefox，不兼容 IE：

1. vue3 不兼容 IE11
2. tailwind2 不兼容 IE11
3. webp 格式图片 不兼容 IE11、ios13

## 最佳实践

### 参考项目

1. vben-admin https://vvbin.cn/next/#/login?redirect=/dashboard/analysis
2. antd-admin-pro https://store.antdv.com/pro/preview/workplace
3. vue-element-admin https://panjiachen.github.io/vue-element-admin

### 整体规范

1. 矢量图尽量使用 svg，位图尽量使用 webp，比 png 压缩率高很多。
2. 写全 typescript 类型，少写 any，解决所有报错。
3. 减少代码嵌套层级：比如判断语句提前返回，用 async 替代 promise。
4. 降低代码重复率：比如封装函数，组件化。
