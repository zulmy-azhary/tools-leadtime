import type { Application, Router } from "express";
import { AuthRouter } from "./auth.route";
import { UserRouter } from "./user.route";
import { UnitRouter } from "./unit.route";

const _routes: Array<[string, Router]> = [
  ["/auth", AuthRouter],
  ["/user", UserRouter],
  ["/unit", UnitRouter]
];

export const routes = (app: Application): void => {
  _routes.map(route => {
    const [url, router] = route;

    return app.use(url, router);
  });
};
