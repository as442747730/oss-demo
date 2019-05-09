import Layout from '@/views/layout/Layout'

const coursemanage = {
  path: '/CourseManage',
  name: '课程商课程管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {path: '/CourseList', component: () => import('@/views/CourseManage/CourseList'), name: '课程商课程列表'},
    {path: '/CourseClass', component: () => import('@/views/CourseManage/CourseClass'), name: '课程分类'},
    {path: '/CourseComment', component: () => import('@/views/CourseManage/CourseComment'), name: '课程评论列表'}
  ]
}
export default coursemanage
