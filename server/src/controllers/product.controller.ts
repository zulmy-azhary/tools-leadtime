import type { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { fetchProduct } from '../services/product.service'
import type { Product } from '../types'

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await fetchProduct()

  const {
    params: { name }
  } = req

  if (name) {
    const filteredProduct = products.filter((product: Product) => product.name === name && product)
    if (!filteredProduct.length) {
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found'
      })
    }

    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filteredProduct[0]
    })
  }

  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  })
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Error: product - create =', error.details[0].message)

    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  logger.info('Success add new product')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Add product successfully',
    data: value
  })
}
