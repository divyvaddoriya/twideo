import { Router } from "express";
import { addTweet, getAllTweetByChannel, getAllTweetByMe, getTweetFeed, removeTweet } from "../controller/tweet.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route('/').post(addTweet).get(getTweetFeed);
router.route('/:channelId').get(getAllTweetByChannel);
router.route('/me').get(getAllTweetByMe);
router.route('/:tweetId').delete(removeTweet);
export default router;