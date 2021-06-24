import { NextFunction, Request, Response } from 'express';

function error(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof Error) {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).json({ error: 'Internal error' })
}

export { error }