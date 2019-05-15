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
      redirect: '/CourseTag'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/Login/Login')
    },
    // 内容管理
    ContentManagement,
    // 组织管理
    organization,
    // 会员管理
    MomberManagement,
    // 课程管理页
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404')
    }
  ]
})
