import { Router } from "express";
import { login, logout, refreshAccessToken, register } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route('/register').post(
    upload.fields([
        {name : 'avatar',   maxCount: 1},
        {name : 'coverImg' , maxCount: 1}
    ]),
    register
)

router.route('/login').post(login)

router.route('/logout').post(verifyJWT, logout)

router.route('/refresh-token').post(refreshAccessToken)

export default router