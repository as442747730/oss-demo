import Vue from 'vue'
import Router from 'vue-router'
import organization from './modules/organization'
import ContentManagement from './modules/ContentManagement'
import MomberManagement from './modules/MomberManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/organization'
    },
    // 内容管理
    ContentManagement,
    // 组织管理
    organization,
    // 会员管理
    MomberManagement
    // 课程管理页
  ]
})
