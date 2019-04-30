# JS常用工具函数
#### util.js
- 此文件是常用的一些工具

#### rem.js
- 此文件是rem格式化的文件
- 使用
  - 首先引入文件
  - 然后使用 `setRem()`
- 注意
  - 必须在页面加载之前引入

#### fetch.js
- 用于预处理fectch请求，简化fetch的步骤
- 目前只有基本功能，loading和提示以后再加
- 使用示例
```js
// 引入到项目
import Fetch from './fetch'
Vue.prototype.fetch = Fetch.fetch

// 组件中使用
// get
this.fetch(url, {}, {query: {}, timeout: 20})
// post
this.fetch(url, {
  methods: 'post',
  body: params
})
```