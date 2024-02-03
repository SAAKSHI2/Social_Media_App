import dataBase from "../connect.js";
import dotenv from "dotenv";

dotenv.config();

export const getComments= async(req,res)=>{
    const q = "select c.*, u.user_id, username, profile_picture from comments as c JOIN users as u ON (u.user_id=c.user_id) where c.post_id = $1 order by c.created_at DESC";
    
    try{
        const comments =await dataBase.query(q,[req.query.post_id]);
        const data=[];
        console.log(comments.rows);
        comments.rows.forEach((row)=>{
            data.push({...row,profile_picture: (row.profile_picture==null)?null:process.env.BACKEND_URL+"images/"+row.profile_picture});
        })
        console.log("get executed",data);
        res.status(200).json(data);

    } catch(err){
        res.status(500).json(err);
    }

}



export const addComments = async(req,res)=>{

    const q="Insert into comments (user_id,content,post_id) values($1,$2,$3) returning*";
    try{
   
        const data = await dataBase.query(q,[req.body.user_id,req.body.content,req.body.post_id]);
        console.log("comment added",data.rows[0]);
        res.status(200).json(data.rows[0]);

    }catch(err){
        res.status(500).json(err);   
    }
};