import { Request, Response } from 'express'
import { FindUsersService } from '../services/FindUsersService'

class FindUsersController {
  async handle(request: Request, response: Response) {
    const findUsersService = new FindUsersService()

    const users = await findUsersService.execute()

    return response.json(users)
  }
}

export { FindUsersController }
