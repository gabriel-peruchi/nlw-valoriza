import { Router } from 'express'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { userAdmin } from './middlewares/UserAdmin'

const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const createTagController = new CreateTagController()
router.post('/tags', userAdmin, createTagController.handle)

export { router }
