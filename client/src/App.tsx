import React from 'react'
import axios from 'axios'
import { BASE_URL } from './helpers/constant'
import { useQuery } from 'react-query'

interface Product {
  _id: string
  name: string
  price: number
}

const getProducts = async (): Promise<Product[]> => {
  return await axios.get(`${BASE_URL}/product`).then(({ data }) => data.data)
}

const App: React.FC = () => {
  const products = useQuery<Product[]>('products', getProducts)
  console.log('Base Url: ', BASE_URL)

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
      <h2 className="text-4xl">Product List :</h2>
      <div className="flex flex-col gap-y-3">
        {products.isLoading && <p>Loading...</p>}
        {products.data?.map((product: Product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
