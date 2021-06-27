import Router from 'koa-router'
import register from "./register";
const router:Router = new Router()

router.use(register.routes())

export default router