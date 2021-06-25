import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

const SECRET_KEY = '7a86bb2f1c32fa4345c1f0e6ce44f5ed'

function authenticate(request: Request, response: Response, next: NextFunction) {
  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const token = bearerToken.split(' ')[1]

  try {
    const { sub } = verify(token, SECRET_KEY) as IPayload

    request.userId = sub

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
}

export { authenticate }

