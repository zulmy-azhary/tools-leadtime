import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 8000
app.use(express.json())
app.use(cors())

app.use('/products', (req: Request, res: Response) => {
  res.status(200).send({ product: 'product 1' })
})

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ status: 200, list: { allProducts: '/products' } })
})

app.listen(port, () => console.log(`Server listening on: http://localhost:${port}`))
