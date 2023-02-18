import type { Request, Response } from 'express'
import { fetchUser } from '../services/user.service'

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await fetchUser()

  return res.status(200).send({ status: true, statusCode: 200, data: users })
}

export const createUser = () => {}
