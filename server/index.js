import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import postRoute from "./routes/post.js";
import likesRoute from "./routes/likes.js";
import commentsRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import friendsRoute from "./routes/friends.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(cors({
    origin:"http://localhost:3000",
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.static("public"));

app.use(cookieParser());


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api/users/',userRoute);
app.use('/api/posts/',postRoute);
app.use('/api/likes/',likesRoute);
app.use('/api/comments/',commentsRoute);
app.use('/api/auth/',authRoute);
app.use('/api/friends/',friendsRoute);




app.listen(PORT, ()=>{
    console.log("server running at port : ", PORT);
})