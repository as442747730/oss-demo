import ajax from './ajax'
const BASE_URL = ''
// ------------------------------------------------------------------------
// 添加人员
export const addUser = (params) => ajax('http://127.0.0.1:5000/addUser', params)
// 查询人员
export const getUser = () => ajax('http://127.0.0.1:5000/getUser')
// 编辑人员
export const editUser = (params) => ajax('http://127.0.0.1:5000/editUser', params)
// 修改人员状态
export const editState = (params) => ajax('http://127.0.0.1:5000/editState', params)
// -------------------------------------------------------------------------
// 查询部门
export const getDep = () => ajax('http://127.0.0.1:5000/getDep')
// 查询部门
export const setDep = (params) => ajax('http://127.0.0.1:5000/setDep', params)
// 编辑部门
export const editDep = (params) => ajax('http://127.0.0.1:5000/editDep', params)
// ------------------------------------标签-----------------------------------------
// 添加课程标签
export const addCourseTag = (params) => ajax(BASE_URL + '/Course/AddCourseTag', params)
// 查询标签
export const GetCourseTagInfo = (params) => ajax(BASE_URL + '/Course/GetCourseTagInfo', params)
// 编辑标签
export const UpdateCourseTag = (params) => ajax(BASE_URL + '/Course/UptCourseTag', params)
// 删除标签
export const DelCourseTag = (params) => ajax(BASE_URL + '/Course/DelCourseTag', params)
// 更改标签状态
export const SetTagSet = (params) => ajax(BASE_URL + '/Course/IsEnableTag', params)
// -----------------------------------标签绑定课程-----------------------------------
// 已绑定课程
export const GetBindCourse = (params) => ajax(BASE_URL + '/Course/GetBindCourse', params)
// 未绑定课程
export const GetUnB1indCourse = (params) => ajax(BASE_URL + '/Course/GetUnB1indCourse', params)
// -----------------------------------课程分类管理-----------------------------------
// 获取课程分类
export const GetAllClass = (params) => ajax(BASE_URL + '/Course/GetAllClassify', params)
// 添加课程分类
export const SetAddClass = (params) => ajax(BASE_URL + '/Course/AddCourseType', params)
// 删除课程分类
export const SetDelClass = (params) => ajax(BASE_URL + '/Course/DeleteClassify', params)
// 更新课程分类
export const UpdateClass = (params) => ajax(BASE_URL + '/Course/UpdateClassify', params)
// -----------------------------------企业课程管理-----------------------------------
// 企业课程列表
export const GetEnterPriseCourse = (params) => ajax(BASE_URL + '/Course/GetEnterPriseCourse', params)
// 修改企业课程状态
export const UpdateCourseAudit = (params) => ajax(BASE_URL + '/Course/UpdateCourseAudit', params)
// 企业课程视频
export const GetVideoUrl = (params) => ajax(BASE_URL + '/Course/GetVideoUrl', params)
// -----------------------------------课程商课程-------------------------------------
// 课程商课程列表
export const GetShopCourse = (params) => ajax(BASE_URL + '/Course/GetShopCourse', params)
// 修改课程上下架
export const IsEnableCourse = (params) => ajax(BASE_URL + '/Course/IsEnableCourse', params)
// 课程绑定分类
export const AddCourseJoinClassify = (params) => ajax(BASE_URL + '/Course/AddCourseJoinClassify', params)
