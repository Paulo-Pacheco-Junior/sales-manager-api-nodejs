import { Router, Request, Response } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { salesRoutes } from "./sales-routes";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Sales Manager API is running!' });
});

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/sales", salesRoutes);

export { routes };