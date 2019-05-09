import Layout from '@/views/layout/Layout'

const ContentManagement = {
  path: 'Content',
  name: '内容管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {
      path: '/Course',
      name: '课程标签管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/ContentManagement/index'),
      // component: Layout,
      children: [
        {
          path: '/CourseTag',
          component: () => import('@/views/ContentManagement/CourseTag/CourseTag'),
          name: '课程标签列表',
          children: [
            {
              path: 'CourseBind',
              component: () => import('@/views/ContentManagement/CourseTag/children/CourseBind.vue'),
              name: '课程绑定'
            }
          ]
        }
      ]
    },
    {
      path: '/CourseManage',
      name: '课程商课程管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/ContentManagement/index'),
      children: [
        {path: '/CourseList', component: () => import('@/views/ContentManagement/CourseManage/CourseList'), name: '课程商课程列表'},
        {path: '/CourseClass', component: () => import('@/views/ContentManagement/CourseManage/CourseClass'), name: '课程分类'},
        {path: '/CourseComment', component: () => import('@/views/ContentManagement/CourseManage/CourseComment'), name: '课程评论列表'}
      ]
    },
    {
      path: '/CompanyCourse',
      name: '企业课程管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/ContentManagement/index'),
      children: [
        {
          path: '/CompanyList',
          component: () => import('@/views/ContentManagement/CompanyCourse/CompanyList'),
          name: '企业课程列表'
        }
      ]
    }
  ]
}
export default ContentManagement
