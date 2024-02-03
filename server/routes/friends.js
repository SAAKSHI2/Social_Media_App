import express from "express";
import { getFriends , followFriend,unFollowFriend} from "../controllers/friends.js";

const router = express.Router();

router.get('/:userID',getFriends)
router.post("/follow",followFriend)
router.post("/unFollow",unFollowFriend)



export default router;