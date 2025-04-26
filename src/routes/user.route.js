import {Router} from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').post(authenticate, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/current').get(authenticate, getCurrentUser);
router.route('/change-password').post(authenticate, changeCurrentPassword);
router.route('/update').post(authenticate, updateAccountDetails);


export default router;