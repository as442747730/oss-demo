import Layout from '@/views/layout/Layout'

const companycourse = {
  path: '/CompanyCourse',
  name: '企业课程管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {
      path: '/CompanyList',
      component: () => import('@/views/CompanyCourse/CompanyList'),
      name: '企业课程列表'
    }
  ]
}
export default companycourse
