import express from "express";
import { getUsers ,getUserId,updateUser,refetch} from "../controllers/users.js";
import multer from "multer";

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"public/images")
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      cb(null,filename)
    }
    
    })
  
  const upload = multer({ storage: storage });




router.get('/find/:user_id',getUsers)
router.get('/refetch',refetch)
router.post('/findUserID',getUserId)
router.put("/",upload.single('profile_picture'),updateUser);

export default router