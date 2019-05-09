import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/views/layout/Layout'
import organization from './modules/organization'
// import courseTag from './modules/courseTag'
// import coursemanage from './modules/coursemanage'
// import companycourse from './modules/companycourse'

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
    // courseTag,
    // 课程商课管理
    // coursemanage,
    // 企业课程管理
    // companycourse,
    // 会员管理
  ]
})
