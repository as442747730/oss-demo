import { getUser } from '@/api/index'
import { GET_USERS } from './mutations-type'
export default {
  async getUsers ({commit}) {
    const result = await getUser()
    console.log(result)
    commit(GET_USERS, { userTable: result.message })
  }
}
