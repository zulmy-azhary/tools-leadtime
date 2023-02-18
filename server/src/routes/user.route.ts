import { Router } from 'express'
import { createUser, getAllUsers } from '../controllers/user.controller'

export const UserRouter: Router = Router()

UserRouter.get('/', getAllUsers)
UserRouter.post('/', createUser)
