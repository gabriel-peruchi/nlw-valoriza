import { Request, Response } from 'express'
import { FindUserReceiverComplimentsService } from '../services/FindUserReceiverComplimentsService'

class FindUserReceiverComplimentsController {
  async handle(request: Request, response: Response) {
    const { userId } = request

    const findUserReceiverComplimentsService = new FindUserReceiverComplimentsService()

    const compliments = await findUserReceiverComplimentsService.execute(userId)

    return response.json(compliments)
  }
}

export { FindUserReceiverComplimentsController }