import { logger } from '../utils/logger'
import ProductModel from '../models/product.model'

export const fetchProduct = async () => {
  return await ProductModel.find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot fetch product from database')
      logger.error(error)
    })
}
