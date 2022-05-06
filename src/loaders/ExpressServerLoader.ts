import { Application } from "express";
import { createExpressServer } from "routing-controllers";

import { Cars } from "../api/controllers/Cars/Cars";

export function ExpressServerLoader(): Application {
  const expressApp: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    defaultErrorHandler: false,
    middlewares: [],
    controllers: [Cars],
  });

  expressApp.listen(process.env.PORT);

  return expressApp;
}
