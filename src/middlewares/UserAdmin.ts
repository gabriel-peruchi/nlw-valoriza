import { Request, Response, NextFunction } from 'express'

function userAdmin(request: Request, response: Response, next: NextFunction) {
  // TODO: implement validation
  const admin = true

  if (admin) {
    return next()
  }

  return response.status(401).json({ error: 'Unauthorized' })
}

export { userAdmin }
