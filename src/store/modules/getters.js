// --------------------------全部课程分类 S---------------------------------------
let classArr = []
export const allClass = state => {
  classArr = []
  if (state.GetAllClass) {
    parseArr(state.GetAllClass)
  }
  return classArr.reverse()
}
// 课程分类多维数组转一维数组
function parseArr (arr) {
  arr.forEach(item => {
    let data = {
      CommonTypeID: item.CommonTypeID,
      Img: item.Img,
      Name: item.Name,
      Nodes: item.Nodes
    }
    classArr.push(data)
    if (item.Nodes.length > 0) {
      parseArr(item.Nodes)
    }
  })
}
// --------------------------全部课程分类 E---------------------------------------
