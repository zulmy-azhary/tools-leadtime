import Joi from 'joi'
import type { Product } from '../types'

export const createProductValidation = (payload: Product): Joi.ValidationResult<Product> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow(null)
  })

  return schema.validate(payload)
}
