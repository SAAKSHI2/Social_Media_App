import dataBase from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const getPosts=async(req,res)=>{

    const token  = req.cookies.accessToken;

    if(!token){
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid!");
        }

        const q = "select p.*, u.user_id as userID, username,profile_picture from posts AS p JOIN users AS u ON (u.user_id=p.user_id) where p.user_id=$1 OR p.user_id IN (SELECT user_id2 FROM friendships WHERE user_id1 = $1) ORDER BY p.created_at DESC";
        try{
            const data = await dataBase.query(q,[userInfo.user_id]);
            // console.log(data.rows);
            const sendData = [];
            data.rows.forEach((row)=>{
                sendData.push({...row,media_data:process.env.BACKEND_URL+"images/"+row.media_data,profile_picture:row.profile_picture!=null?process.env.BACKEND_URL+"images/"+row.profile_picture:null}
                )});
            res.status(200).json(sendData);
        } catch(err){
            // console.log(err.message);
            res.status(500).json(err);
            
        }
        
    })


}


export const addPost = async(req,res)=>{

    const q="Insert into posts (user_id,content,media_type,media_data) values($1,$2,$3,$4) returning*";
    try{
        const media_data = req.file.filename;
        const data = await dataBase.query(q,[req.body.user_id,req.body.content,req.file.mimetype,media_data]);
        data.rows[0].media_data = process.env.BACKEND_URL+"images/"+data.rows[0].media_data;


        res.status(200).json(data.rows[0]);

    }catch(err){
        res.status(500).json(err);   
    }
};


export const getPostOfUser=async(req,res)=>{
    const q = "select p.*, u.user_id as userID, username,profile_picture from posts AS p JOIN users AS u ON (u.user_id=p.user_id) where p.user_id=$1  ORDER BY p.created_at DESC";
    try{
        const data = await dataBase.query(q,[req.params.userID]);
        // console.log(data.rows);
        const sendData = [];

        data.rows.forEach((row)=>{
            sendData.push({...row,media_data:process.env.BACKEND_URL+"images/"+row.media_data,profile_picture:row.profile_picture!=null?process.env.BACKEND_URL+"images/"+row.profile_picture:null}
            )});
            
        res.status(200).json(sendData);
    } catch(err){
        // console.log(err.message);
        res.status(500).json(err);
        
    }

}

