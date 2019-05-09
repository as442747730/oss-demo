import Layout from '@/views/layout/Layout'

const courseTag = {
  path: '/Course',
  name: '课程标签管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {
      path: '/CourseTag',
      component: () => import('@/views/CourseTag/CourseTag'),
      name: '课程标签列表',
      children: [
        {
          path: 'CourseBind',
          component: () => import('@/views/CourseTag/children/CourseBind.vue'),
          name: '课程绑定'
        }
      ]
    }
  ]
}
export default courseTag
