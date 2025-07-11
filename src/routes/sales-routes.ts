import { Router } from "express";

import { SalesController } from "../controllers/sales-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

const salesRoutes = Router();
const salesController = new SalesController();

salesRoutes.use(
  ensureAuthenticated,
  verifyUserAuthorization(["seller", "supervisor"])
);
salesRoutes.post("/", salesController.create);
salesRoutes.get("/", salesController.index);
salesRoutes.get("/:id", salesController.show);
salesRoutes.put("/:id", salesController.update);
salesRoutes.delete("/:id", salesController.delete);

export { salesRoutes };