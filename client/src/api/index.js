import ajax from './ajax'
const BASE_URL = 'http://localhost:3000'
// 添加人员
export const addUser = (params) => ajax(BASE_URL + '/addUser', params)
// 查询人员
export const getUser = () => ajax(BASE_URL + '/getUser')
