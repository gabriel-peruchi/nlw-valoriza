import { Request, Response } from 'express'
import { FindUserSenderComplimentsService } from '../services/FindUserSenderComplimentsService'

class FindUserSenderComplimentsController {
  async handle(request: Request, response: Response) {
    const { userId } = request

    const findUserSenderComplimentsService = new FindUserSenderComplimentsService()

    const compliments = await findUserSenderComplimentsService.execute(userId)

    return response.json(compliments)
  }
}

export { FindUserSenderComplimentsController }