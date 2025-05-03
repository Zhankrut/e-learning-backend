import { Router } from "express";
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
} from "../controllers/tweet.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-tweet").post(authenticate, createTweet); // Create a new tweet
router.route("/user-tweets").get(authenticate, getUserTweets); // Get all tweets of the logged-in user
router.route("/update-tweet/:tweetId").put(authenticate, updateTweet); // Update a specific tweet
router.route("/delete-tweet/:tweetId").delete(authenticate, deleteTweet); // Delete a specific tweet

export default router;