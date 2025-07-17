import { Router } from "express";
import { addTweet } from "../controller/tweet.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route('/').post(addTweet);

export default router;