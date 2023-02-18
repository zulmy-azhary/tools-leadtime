import mongoose from 'mongoose'
import type { Product } from '../types'

const { Schema } = mongoose

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    name: String,
    price: Number
  },
  { timestamps: true }
)

const ProductModel = mongoose.model<Product>('Product', productSchema, 'product')

export default ProductModel
