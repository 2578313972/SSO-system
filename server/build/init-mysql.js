const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '121.5.42.203',
  user: 'v_jiabcao',
  password: 'v_jiabcao',
  database: 'v_jiabcao'
})
connection.connect()
var pool = function (sql, values) {
  return new Promise(function (resolve, reject) {
    console.log('开始连接');
    connection.query(sql, values, function (error, results, fields) {
      console.log('连接成功');

      if (error) resolve(error);
      resolve(results);
    });
  });
};

const sqlDir = path.resolve(__dirname, '../src/mysql/sql')
const fileArr = fs.readdirSync(sqlDir)

fileArr.forEach(async fileName => {
  const fileData = fs.readFileSync(path.join(sqlDir, fileName), 'utf-8')
  sqlArr = fileData.replace(/\/\*.*\*\//gs, '').replace(/\r|\n/g, '').split(';').filter(item => item)
  for (const sql of sqlArr) {
    console.log(`sql语句：${sql} （执行中……）`);
    console.log('pool:', await pool(sql));
  }
  connection.end()
})