import mysql, { Connection } from 'mysql'
import configInfo from '../config/basic-info'

interface Ipool<T = any> {
  (sql: string, values?: Array<string | number>): Promise<T>
}

const connection: Connection = mysql.createConnection(configInfo.mysql)

connection.connect()
export const pool: Ipool = function (sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, function (error, results, fields) {
      if (error) reject(error)
      // connection.end()
      resolve(results)
    })
  })
}
