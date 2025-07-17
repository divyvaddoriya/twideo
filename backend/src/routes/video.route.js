import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addVideo, getFeed, getSingleVideo } from "../controller/video.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();


router.route('/').post(verifyJWT, upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]), addVideo)
  .get(verifyJWT , getFeed )

router.route('/:videoId').get(verifyJWT , getSingleVideo);

export default router;