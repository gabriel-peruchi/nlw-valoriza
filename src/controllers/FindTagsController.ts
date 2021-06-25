import { Request, Response } from 'express'
import { FindTagsService } from '../services/FindTagsService'

class FindTagsController {
  async handle(request: Request, response: Response) {
    const findTagsService = new FindTagsService()

    const tags = await findTagsService.execute()

    return response.json(tags)
  }
}

export { FindTagsController }