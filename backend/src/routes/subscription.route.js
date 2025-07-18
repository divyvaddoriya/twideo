import { Router } from "express";
import { subscribe, unsubscribe } from "../controller/subscription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route('/:channelId').post(subscribe).delete(unsubscribe);

export default router;