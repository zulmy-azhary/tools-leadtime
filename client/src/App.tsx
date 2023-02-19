import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from './helpers/constant'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { InputForm } from './components'

interface Product {
  product_id: string
  name: string
  price: number
}

type TProduct = Omit<Product, 'product_id'>

const getProducts = async (): Promise<Product[]> => {
  return await axios.get(`${BASE_URL}/product`).then(({ data }) => data.data)
}

const addProduct = async (data: TProduct) => {
  return await axios.post(`${BASE_URL}/product`, data).then((res) => {
    console.log(res)
  })
}

const initialValue: TProduct = {
  name: '',
  price: 0
}

const App: React.FC = () => {
  const [product, setProduct] = useState(initialValue)
  const products = useQuery<Product[]>('products', getProducts)
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      setProduct(initialValue)
    }
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (product.name && product.price) {
      mutate({
        name: product.name,
        price: product.price
      })
    }
  }

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 basis-1/2">
        <InputForm id="name" label="Product Name" type="text" value={product.name} onChange={onChange} />
        <InputForm id="price" label="Price" type="number" value={product.price} onChange={onChange} />
        <button type="submit" disabled={isLoading} className="bg-gray-500 px-5 py-2 disabled:bg-gray-700">
          Add Product
        </button>
      </form>
      <h2 className="text-4xl">Product List :</h2>
      {products.isLoading && <p>Loading...</p>}
      {products.isError && <p>{JSON.stringify(products.error)}</p>}
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-4xl w-full gap-4">
        {products.data?.map((product: Product) => (
          <div
            key={product.product_id}
            className="col-span-1 md:col-span-4 lg:col-span-3 rounded-sm bg-cardDark p-4 text-end"
          >
            <p>{product.name}</p>
            <p>Rp. {product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
