// import { opts } from 'koa-session'
import { join } from 'path'
import { readFileSync } from 'fs'
import { ConnectionConfig } from 'mysql'
import { SignOptions } from 'jsonwebtoken'
interface Ibase {
  // config: Partial<opts>
  mysql: ConnectionConfig
  baseURL: string
  port: string | number
  privateKey: string
  SignOptions?: SignOptions
}

// writeFileSync('./private.key', 'fasdsfs')

const base: Ibase = {
  /* config: {
    key: 'uid', //cookie key (default is koa:sess)
    maxAge: 600000, // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认true
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false //(boolean) renew session when session is nearly expired,
  }, */
  mysql: {
    host: '121.5.42.203',
    user: 'v_jiabcao',
    password: 'v_jiabcao',
    database: 'v_jiabcao'
  },
  baseURL: '',
  port: 4000,
  privateKey: readFileSync(join(__dirname, 'private.key'), 'utf-8')
}

export default base
