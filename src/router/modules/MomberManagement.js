import Layout from '@/views/layout/Layout'
const MomberManagement = {
  path: 'MomberManagement',
  name: '会员管理',
  iconCls: 'el-icon-time',
  component: Layout,
  children: [
    {
      path: '/Personal',
      name: '个人会员管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/MomberManagement/index'),
      children: [
        {path: '/PersonalList', component: () => import('@/views/MomberManagement/Personal/PersonalList'), name: '会员列表'}
      ]
    },
    {
      path: '/ChainBusiness',
      name: '连锁企业列表',
      iconCls: 'el-icon-time',
      component: () => import('@/views/MomberManagement/index'),
      children: [
        {path: '/ChainBusinessList', component: () => import('@/views/MomberManagement/ChainBusiness/ChainBusinessList'), name: '企业列表'}
      ]
    },
    {
      path: '/LecturerMember',
      name: '讲师会员管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/MomberManagement/index'),
      children: [
        {path: '/LecturerMemberList', component: () => import('@/views/MomberManagement/LecturerMember/LecturerMemberList'), name: '讲师会员列表'}
      ]
    },
    {
      path: '/AgencyMembers',
      name: '机构会员管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/MomberManagement/index'),
      children: [
        {path: '/AgencyMembersList', component: () => import('@/views/MomberManagement/AgencyMembers/AgencyMembersList'), name: '机构会员列表'}
      ]
    },
    {
      path: '/Manufacturing',
      name: '制造企业会员管理',
      iconCls: 'el-icon-time',
      component: () => import('@/views/MomberManagement/index'),
      children: [
        {path: '/ManufacturingList', component: () => import('@/views/MomberManagement/Manufacturing/ManufacturingList'), name: '制造企业会员列表'}
      ]
    }
  ]
}
export default MomberManagement
