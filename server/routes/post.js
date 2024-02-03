import express from "express";
import { getPosts,addPost,getPostOfUser } from "../controllers/post.js";
import multer from "multer";



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




const router = express.Router();


router.post('/',getPosts);
router.post('/add',upload.single('file'),addPost);
router.get('/:userID',getPostOfUser);


export default router;