/**
 * Created by Lee on 2018/3/28.
 */
// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    return reg.test(str)
}
export function isNull(str) {
    return str==0?false:true
}