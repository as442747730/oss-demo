import { GET_USERS, GET_COURSE_TAG, GET_CLASS, GET_EP_COURSE, GET_SHOP_COURSE } from './mutations-type'
export default {
  [GET_USERS] (state, {userTable}) {
    state.userTable = userTable
  },
  // 获取课程标签
  [GET_COURSE_TAG] (state, {GetCourseTag}) {
    state.GetCourseTag = GetCourseTag
  },
  // 获取课程分类
  [GET_CLASS] (state, {GetAllClass}) {
    state.GetAllClass = GetAllClass
  },
  // 获取企业课程列表
  [GET_EP_COURSE] (state, {EnterPriseCourse}) {
    state.EnterPriseCourse = EnterPriseCourse
  },
  // 获取课程商课程列表
  [GET_SHOP_COURSE] (state, {shopCourse}) {
    state.shopCourse = shopCourse
  }
}
