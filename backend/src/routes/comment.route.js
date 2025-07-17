import { Router } from "express";
import { addComment } from "../controller/comment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route('/').post(addComment);

export default router;