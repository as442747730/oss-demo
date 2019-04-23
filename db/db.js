const mysql = require('mysql');

// const conn = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'house'
// })
// conn.connect();

const conn = mysql.createConnection({
  host: 'rm-2ze9k65q394ma1y2u4o.mysql.rds.aliyuncs.com',
  user: 'a2337230',
  password: 'Jj543540310',
  database: 'demo'
})
conn.connect();

module.exports = conn;