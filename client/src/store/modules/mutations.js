import { GET_USERS } from './mutations-type'
export default {
  [GET_USERS] (state, {userTable}) {
    state.userTable = userTable
  }
}
