import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfie,
  getWatchHistory,
  login,
  logout,
  refreshAccessToken,
  register,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImg,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  register,
);

router.route("/login").post(login);

router.route("/logout").post(verifyJWT, logout);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.route("/update-acccount").patch(verifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/update-coverImg")
  .patch(verifyJWT, upload.single("coverImg"), updateUserCoverImg);

router.route("/c/:username").get(verifyJWT, getUserChannelProfie);
router.route("/history").get(verifyJWT, getWatchHistory);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/me").get(verifyJWT, getCurrentUser);
export default router;
