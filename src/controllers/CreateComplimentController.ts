import { Request, Response } from 'express'
import { CreateComplimentService } from '../services/CreateComplimentService'

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tagId, userSenderId, userReceiverId, message } = request.body

    const createComplimentService = new CreateComplimentService()

    const compliment = await createComplimentService.execute({
      tagId,
      userSenderId,
      userReceiverId,
      message
    })

    return response.json(compliment)
  }
}

export { CreateComplimentController }
