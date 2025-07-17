import { Router } from "express";
import { addLike, removeLike } from "../controller/like.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT)
router.route('/').post(addLike).delete(removeLike);

export default router;