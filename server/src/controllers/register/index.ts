import { Context, Next } from 'koa'
import jwt, { SignOptions } from 'jsonwebtoken'
import { pool } from '../../mysql'
import configInfo from '../../config/basic-info'
import path from 'path'
import fs from 'fs'
import { IgenerateJWT } from '../../types/register'

interface Use {
  (ctx: Context, next: Next): void
}
interface IUser {
  account: string
  password: string
  create_time?: string
  update_time?: string
}

/**
 * @description 2021-06-25
 * @param { string | Buffer | object  } payload
 * @param { string | number  } time
 * @return { string }
 */
const generateJWT: IgenerateJWT = function (payload, time = 60 * 60 * 12) {
  return jwt.sign(payload, configInfo.privateKey, {
    expiresIn: time
  })
}
function verifyJWT(token: string): boolean {
  try {
    jwt.verify(token, configInfo.privateKey)
    return true
  } catch (error) {
    return false
  }
}

export const check: Use = async function (ctx) {
  let token: string = ''
  if (typeof ctx.query.token === 'string') {
    token = ctx.query.token
  }
  if (token && verifyJWT(token)) {
    if (ctx.query.fromUrl) {
      ctx.redirect(`${ctx.query.fromUrl}?token=${token}`)
    }
    ctx.body = '登录验证成功'
  } else {
    ctx.body = fs.readFileSync(
      path.resolve(process.cwd(), '../client/login.html'),
      'utf-8'
    )
  }
  // ctx.body = ctx.query.token
}
export const _logout: Use = function (ctx) {}
export const register: Use = async function (ctx) {
  const user: IUser = <Record<keyof IUser, string>>ctx.request.body
  await pool(
    ` INSERT INTO USER(create_time,update_time,account,password)
    VALUES(?,?,?,?)`,
    [new Date() + '', new Date() + '', user.account, user.password]
  )
  ctx.body = '注册成功'
}
export const _login: Use = async function (ctx) {
  console.log('_login')

  const user: IUser = <any>ctx.request.body
  console.log(user)

  /* if(ctx.request.body.account && ctx.request.body.password){

  } */
  const checkUser: string[] = await pool(
    `select * from USER where account=? and password=?`,
    [user.account, user.password]
  )
  console.log('checkUser:', checkUser)

  if (checkUser.length) {
    console.log(checkUser)

    const token = generateJWT({})
    if (ctx.query.fromUrl) {
      ctx.redirect(`${ctx.query.fromUrl}?token=${token}`)
    }
    ctx.body = {
      success: true,
      data: token
    }
  } else {
    ctx.body = `账号或密码错误`
  }

  // const account
  // const password
}
