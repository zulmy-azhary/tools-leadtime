import { logger } from '../utils/logger';
import ProductModel from '../models/product.model';
import { type Product } from '../types';

export const fetchProduct = async () => {
  return await ProductModel.find()
    .then(data => {
      return data;
    })
    .catch(error => {
      logger.info('Cannot fetch product from database');
      logger.error(error);
    });
};

export const addProduct = async (payload: Product) => {
  return await ProductModel.create(payload);
};
