import { Router } from "express";
import { subscribe } from "../controller/subscription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route('/').post(subscribe);

export default router;