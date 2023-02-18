import type { Application, Router } from 'express'
import { UserRouter } from './user.route'
import { ProductRouter } from './product.route'

const _routes: Array<[string, Router]> = [
  ['/users', UserRouter],
  ['/product', ProductRouter]
]

export const routes = (app: Application): void => {
  _routes.map((route) => {
    const [url, router] = route

    return app.use(url, router)
  })
}
