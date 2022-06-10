import { Router } from "express";
import { methods as bankController } from "./../controllers/bank.controller";

const router = Router();

router.get("/:clientId", bankController.getAccounts);
router.get("/:clientId/:accountId", bankController.getAccount);
router.get("/:clientNumber", bankController.getTransfers);
router.post("/", bankController.postTransfer);
// router.put("/:id", languageController.updateLanguage);
// router.delete("/:id", languageController.deleteLanguage);

export default router;
