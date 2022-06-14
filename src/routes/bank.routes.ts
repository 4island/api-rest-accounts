import { Router } from "express";
import { methods as bankController } from "../controllers/bank.controller";

const router = Router();

router.get("/:clientId", bankController.getAccounts);
router.get("/account/:clientId/:accountId", bankController.getAccount);
router.post("/transfer", bankController.postTransfer);
router.get("/transfer/:clientNumber", bankController.getTransfers);

export default router;
