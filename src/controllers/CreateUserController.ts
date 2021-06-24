import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
  async handle(request: Request, reponse: Response) {
    const { name, email, admin } = request.body

    const createUserService = new CreateUserService()

    const userSave = await createUserService.execute({ name, email, admin })

    return reponse.json(userSave)
  }
}

export { CreateUserController }
