import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { FindTagsController } from './controllers/FindTagsController'
import { FindUserReceiverComplimentsController } from './controllers/FindUserReceiverComplimentsController'
import { FindUsersController } from './controllers/FindUsersController'
import { FindUserSenderComplimentsController } from './controllers/FindUserSenderComplimentsController'
import { authenticate } from './middlewares/AuthenticateMiddleware'
import { userAdmin } from './middlewares/UserAdminMiddleware'

const router = Router()

const createTagController = new CreateTagController()
const findTagsController = new FindTagsController()
const createUserController = new CreateUserController()
const findUsersController = new FindUsersController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const findUserReceiverComplimentsController = new FindUserReceiverComplimentsController()
const findUserSenderComplimentsController = new FindUserSenderComplimentsController()

router.post('/login', authenticateUserController.handle)
router.post('/users', authenticate, createUserController.handle)
router.get('/users', authenticate, findUsersController.handle)
router.get('/users/current/compliments/received', authenticate, findUserReceiverComplimentsController.handle)
router.get('/users/current/compliments/sended', authenticate, findUserSenderComplimentsController.handle)
router.post('/tags', authenticate, userAdmin, createTagController.handle)
router.get('/tags', authenticate, findTagsController.handle)
router.post('/compliments', authenticate, createComplimentController.handle)

export { router }

