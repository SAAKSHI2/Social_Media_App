import dataBase from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const getUsers=async(req,res)=>{
    const userId = req.params.user_id;
    const q="select * from users where user_id=$1";

    try{
        const data= await dataBase.query(q,[parseInt(userId)]);
        const follower = await dataBase.query("select count(*) from friendships where user_id2=$1",[userId]);
        const posts = await dataBase.query("select count(*) from posts where user_id=$1",[userId]);

        const following = await dataBase.query("select count(*) from friendships where user_id1=$1",[userId]);


        data.rows[0].profile_picture = data.rows[0].profile_picture!=null?process.env.BACKEND_URL+"images/"+data.rows[0].profile_picture:null;

        const {password,...info} = data.rows[0];

        res.status(200).json({...info,follower:follower.rows[0].count,following:following.rows[0].count,posts:posts.rows[0].count});
    }catch(err){
        res.status(500).json(err);
    }

}

export const refetch=async(req,res)=>{
    const token  = req.cookies.accessToken;

    if(!token){
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid!");
        }
        
        const check = await dataBase.query("select * from users where user_id=$1",[userInfo.user_id]);
        const follower = await dataBase.query("select count(*) from friendships where user_id2=$1",[userInfo.user_id]);
        const posts = await dataBase.query("select count(*) from posts where user_id=$1",[userInfo.user_id]);

        const following = await dataBase.query("select count(*) from friendships where user_id1=$1",[userInfo.user_id]);


        check.rows[0].profile_picture = check.rows[0].profile_picture!=null?process.env.BACKEND_URL+"images/"+check.rows[0].profile_picture:null;

        const {password,...otherData} = check.rows[0];
        console.log({...otherData,follower:follower.rows[0].count,following:following.rows[0].count,posts:posts.rows[0].count});
         return res.json({...otherData,follower:follower.rows[0].count,following:following.rows[0].count,posts:posts.rows[0].count});

    })

}

export const getUserId = async(req,res)=>{
    const username = req.body.username;
    const q="select user_id from users where LOWER(username) = $1";

    try{
        const data= await dataBase.query(q,[username.toLowerCase()]);
        if(data.rows.length>0)
        res.status(200).json(data.rows[0].user_id);
        else{
            res.status(200).json(null);
        }
    }catch(err){
        res.status(500).json(err);
    }

}
export const updateUser = async(req,res)=>{
    const {username,email,bio,location,user_id} = req.body;
    const profile_picture = req.file?req.file.filename:null;
    let q="";

    if(profile_picture===null){
        q="update users set username=$1 , bio=$2, email=$3,location=$4 where user_id = $5 returning*";
    } else{
        q="update users set username=$1, profile_picture=$2, bio=$3, email=$4, location=$5 where user_id = $6 returning*";

     }



    try{
        let data;

        if(profile_picture===null){
            data= await dataBase.query(q,[username,bio,email,location,user_id]);
        } else{
            data= await dataBase.query(q,[username,profile_picture,bio,email,location,user_id]);
        }

        const follower = await dataBase.query("select count(*) from friendships where user_id2=$1",[user_id]);
        const posts = await dataBase.query("select count(*) from posts where user_id=$1",[user_id]);

        const following = await dataBase.query("select count(*) from friendships where user_id1=$1",[user_id]);
   
        data.rows[0].profile_picture = data.rows[0].profile_picture!=null?process.env.BACKEND_URL+"images/"+data.rows[0].profile_picture:null;
        const {password,...info} = data.rows[0];
        res.status(200).json({...info,follower:follower.rows[0].count,following:following.rows[0].count,posts:posts.rows[0].count});
        
    }catch(err){
        console.log(err.message);
        res.status(500).json(err);
    }

}