import { Request, Response, NextFunction } from 'express'
import { FindUserByIdService } from '../services/FindUserByIdService'

async function userAdmin(request: Request, response: Response, next: NextFunction) {
  const { userId } = request

  const findUserByIdService = new FindUserByIdService()
  const { admin } = await findUserByIdService.execute(userId)

  if (admin) {
    return next()
  }

  return response.status(401).json({ error: 'Unauthorized' })
}

export { userAdmin }
