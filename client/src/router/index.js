import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/organization'
    },
    // {
    //   path: '/layout',
    //   name: 'Layout',
    //   component: Layout
    // }
    {
      path: '/organization',
      name: '组织管理',
      component: Layout,
      children: [
        {path: '/RoleManage', component: () => import('@/views/Organization/RoleManage'), name: '权限管理'},
        {path: '/positionManagement', component: () => import('@/views/Organization/PositionManagement'), name: '部门管理'},
        {path: '/personalManagement', component: () => import('@/views/Organization/PersonalManagement'), name: '人员管理'}
      ]

    }
  ]
})
