
import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// create tweet
const createTweet = asyncHandler(async (req, res) => {
  
    const userId = req.user?._id;
    const { content } = req.body;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }
    if (!content || content === "") {
        throw new ApiError(400, " there is no content provided ");
    }

    const tweet = await Tweet.create({
        content,
        owner: userId
    });

    const createdTweet = await Tweet.findById(tweet._id);

    if (!createdTweet) {
        throw new ApiError(400, " the tweet cannot be created ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdTweet, " the tweet has been created successfully ")
        )
})

//  get user tweets
const getUserTweets = asyncHandler(async (req, res) => {
  
    const { userId } = req.user?._id;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }


    if (!isValidObjectId(userId)) {
        throw new ApiError(400, " the user id is not a vailid userid ");
    }

    const tweets = await Tweet.aggregate([
        {
            $match: {
                owner: mongoose.Types.ObjectId(userId)
            }
        },
        {
            $unset: "owner"
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, tweets, " all the tweet of the user. ")
        )


})

//update tweet
const updateTweet = asyncHandler(async (req, res) => {
   
    const { tweetId } = req.params
    const { content } = req.body;
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, " the id of the tweet is invailid id ");
    }
    if (!content) {
        throw new ApiError(400, " content of the tweet cannot be found ");
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, { $set: { content: content } }, { new: true });

    if (!updateTweet) {
        throw new ApiError(400, " the tweet cannot be updated. ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTweet, " the tweet updated successfully ")
        )
})

//delete tweet
const deleteTweet = asyncHandler(async (req, res) => {
    

    const { tweetId } = req.params

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, " the id of the tweet is invailid id ");
    }

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

    if (!deletedTweet) {
        throw new ApiError(400, " the tweet cannot be updated. ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedTweet, " the tweet deleted successfully ")
        )

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}