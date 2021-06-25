import { Request, Response, NextFunction } from 'express'
import { FindByIdUserService } from '../services/FindByIdUserService'

async function userAdmin(request: Request, response: Response, next: NextFunction) {
  const { userId } = request

  const findByIdUserService = new FindByIdUserService()
  const { admin } = await findByIdUserService.execute(userId)

  if (admin) {
    return next()
  }

  return response.status(401).json({ error: 'Unauthorized' })
}

export { userAdmin }
