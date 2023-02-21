import type { Application, Router } from 'express';
import { AuthRouter } from './auth.route';
import { ProductRouter } from './product.route';

const _routes: Array<[string, Router]> = [
  ['/auth', AuthRouter],
  ['/product', ProductRouter]
];

export const routes = (app: Application): void => {
  _routes.map(route => {
    const [url, router] = route;

    return app.use(url, router);
  });
};
