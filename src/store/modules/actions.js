import { getUser, GetCourseTagInfo, GetAllClass, GetEnterPriseCourse, GetShopCourse } from '@/api/index'
import { GET_USERS, GET_COURSE_TAG, GET_CLASS, GET_EP_COURSE, GET_SHOP_COURSE } from './mutations-type'
export default {
  async getUsers ({commit}) {
    const result = await getUser()
    commit(GET_USERS, { userTable: result.message })
  },
  // 获取全部标签
  async GetCourseTag ({commit}, params) {
    const result = await GetCourseTagInfo(params)
    commit(GET_COURSE_TAG, { GetCourseTag: result })
  },
  // 获取全部分类
  async GetAllClass ({commit}, params) {
    const result = await GetAllClass(params)
    commit(GET_CLASS, { GetAllClass: (JSON.parse(result).Data).reverse() })
  },
  // 获取企业课程列表
  async GetEPCourse ({commit}, params) {
    const result = await GetEnterPriseCourse(params)
    commit(GET_EP_COURSE, { EnterPriseCourse: result })
  },
  // 获取课程商课程列表
  async GetSPCourse ({commit}, params) {
    const result = await GetShopCourse(params)
    commit(GET_SHOP_COURSE, { shopCourse: result })
  }
}
