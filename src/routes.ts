import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { userAdmin } from './middlewares/UserAdminMiddleware'
import { authenticate } from './middlewares/AuthenticateMiddleware'

const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const createTagController = new CreateTagController()
router.post('/tags', authenticate, userAdmin, createTagController.handle)

const authenticateUserController = new AuthenticateUserController()
router.post('/login', authenticateUserController.handle)

const createComplimentController = new CreateComplimentController()
router.post('/compliments', authenticate, createComplimentController.handle)

export { router }
