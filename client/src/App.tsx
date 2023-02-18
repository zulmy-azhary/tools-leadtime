import React, { useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from './helpers/constant'
import { useQuery } from 'react-query'
import { InputForm } from './components'

interface Product {
  product_id: string
  name: string
  price: number
}

const getProducts = async (): Promise<Product[]> => {
  return await axios.get(`${BASE_URL}/product`).then(({ data }) => data.data)
}

const addProduct = async (data: any) => {
  try {
    await axios
      .post(`${BASE_URL}/product`, data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (error) {
    console.error(error)
  }
}

const App: React.FC = () => {
  const products = useQuery<Product[]>('products', getProducts)
  const productRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (productRef.current?.value && priceRef.current?.value) {
      console.log(productRef.current?.value, priceRef.current?.value)
      await addProduct({
        name: productRef.current.value,
        price: priceRef.current.value
      })
    }
  }

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <InputForm id="product" label="Product Name" type="text" ref={productRef} />
        <InputForm id="price" label="Price" type="number" ref={priceRef} />
        <button className="bg-gray-500 px-5 py-2" type="submit">
          Add Product
        </button>
      </form>
      <h2 className="text-4xl">Product List :</h2>
      <div className="flex flex-col gap-y-3">
        {products.isLoading && <p>Loading...</p>}
        {products.data?.map((product: Product) => (
          <div key={product.product_id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
