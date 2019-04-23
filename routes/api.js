const express = require('express');
const router = express.Router();
const conn = require('../db/db');
// 接口连通性测试
router.get('/', (req,res) => {
  res.send("你好")
})
// 添加用户
router.get('/addUser', (req, res) => {
  console.log(req.query)
  let data = {
    name: req.query.name,
    sex: req.query.sex,
    tel: req.query.tel,
    workNum: req.query.workNum,
    desc: req.query.desc,
    dep: req.query.dep
  }
  const sqlStr = `INSERT INTO users (name,sex,tel,workNum,description,dep) VALUES (?,?,?,?,?,?)`
  const params = [data.name,data.sex,data.tel,data.workNum,data.desc,data.dep]
  conn.query(sqlStr, params, (error, result) => {
    res.json({
      success:200,
      message: '添加人员成功'
    })
  })
})
// 获取用户
router.get('/getUser', (req, res) => {
  const sqlStr = 'SELECT * FROM users'
  conn.query(sqlStr, (error, results) => {
    res.json({
      success: 200,
      message: results
    })
  })
})
module.exports = router;