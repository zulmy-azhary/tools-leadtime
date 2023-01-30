import { type Request, type Response, Router } from 'express'

export const UserRouter: Router = Router()

UserRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send({ user: 'user 1' })
})
