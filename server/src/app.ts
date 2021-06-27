import Koa from 'koa'
import cors from 'koa2-cors'
import bodyparser from 'koa-bodyparser'
import router from './routers'
import configInfo from './config/basic-info'
const app = new Koa()

app
  .use(cors())
  .use(async (ctx, next) => {
    await next()
    // ctx.body = JSON.stringify(ctx.body, null, 2)
  })
  .use(bodyparser())
  .use(router.routes())

app.listen(configInfo.port, () => {
  console.log(`Your run appliction on http://127.0.0.1:${configInfo.port}`)
})
