import { logger } from '../utils/logger'
import UserModel from '../models/user.model'

export const fetchUser = async () => {
  return await UserModel.find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot fetch users from database')
      logger.error(error)
    })
}
