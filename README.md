# 目录结构

## 公共组件

> AddBtn 添加新建按钮

> DateOicker 日期筛选组件

> DelDialog 删除弹窗

> DepDialog 部门下拉框

> GoBack 返回上一页

> PsdDialog 密码重置弹窗

> SearchBox 搜索框组件

> Table 表格组件

> Tabs 选项卡组件

> Tree 树形菜单组件

> UpdateImg 图片上传组件


## Api

### api 二次封装axios
### index 页面所有请求，可拆分

## router

### index 入口文件

### ContentManagement 内容管理路由
### organization 组织管理路由
### MomberManagement 会员管理路由

## views 界面UI层

### ContentManagement 内容管理

#### CompanyCourse 企业课程列表

#### CourseManage 课程商课程管理
##### CourseList  课程商课程列表
##### CourseComment 课程评论列表
##### CourseClass 课程分类

##### conponent 企业课程列表组件

###### AddClass 添加分类dialog
###### SelectClass 绑定分类dialog

### CourseTag 课程标签管理

#### CourseTag 课程标签列表
##### CourseBind 标签绑定课程
##### AddTag 新建标签

### Layout UI框架

#### NavBar 顶部导航
#### Navigation 面包屑导航
#### SideBar 侧边栏

### MomberManagement 会员管理

#### PersonalList 会员列表
#### ChainBusinessList 企业列表
#### LecturerMemberList 讲师列表
#### AgencyMembersList 机构会员列表
#### ManufacturingList 制造业会员列表

### Organization 组织管理

#### RoleManage 权限管理
#### PositionManagement 部门管理
#### PersonalManagement 人员管理
