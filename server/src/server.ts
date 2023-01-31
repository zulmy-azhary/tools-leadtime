import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config/environment'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import { routes } from './routes'

dotenv.config()

mongoose.set('strictQuery', true)
mongoose
  .connect(config.db as string)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error(err))

const app = express()
const port = process.env.PORT ?? 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ status: true, statusCode: 200, data: { allProducts: '/product', users: '/user' } })
})

app.listen(port, () => {
  logger.info(`Server listening on port ${port}, url: http://localhost:${port}`)
})
