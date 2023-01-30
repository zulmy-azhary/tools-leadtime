import React, { useEffect, useState } from 'react'

interface Product {
  _id: string
  name: string
  price: number
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch('http://localhost:5000/product')
      const data = await res.json()
      setProducts(data.data)
    }

    fetchProduct().catch((err) => console.error(err))
  }, [])

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
      <h2 className="text-4xl">Product List :</h2>
      <div className="flex flex-col gap-y-3">
        {products.map((product: Product, i: number) => (
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
