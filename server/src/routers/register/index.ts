import Router from 'koa-router'
import { check, register, _login, _logout } from '../../controllers/register'

const router: Router = new Router()

router.get('/', check)
router.post('/', _login)
router.post('/register', register)
router.post('/_login', _login)
router.get('/_logout', _logout)

export default router
