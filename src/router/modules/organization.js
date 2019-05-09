import Layout from '@/views/layout/Layout'

const organization = {
  path: '/organization',
  name: '组织管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {path: '/RoleManage', component: () => import('@/views/Organization/RoleManage'), name: '权限管理'},
    {path: '/positionManagement', component: () => import('@/views/Organization/PositionManagement'), name: '部门管理'},
    {path: '/personalManagement', component: () => import('@/views/Organization/PersonalManagement'), name: '人员管理'}
  ]
}
export default organization
