import dataBase from "../connect.js";

export const getLikes=async(req,res)=>{

    const q="select user_id from likes where post_id=$1";
    try{
        const data = dataBase.query(q,[req.query.post_id]);
        res.status(200).json((await data).rows.map(likes=>likes.user_id));
    }catch(err){
        res.status(500).json(err);
    }



}

export const addLikes=async(req,res)=>{
    const q = "Insert into likes (user_id,post_id) values($1,$2)";

    try{
        const data = dataBase.query(q,[req.body.user_id,req.body.post_id]);
        res.status(200).json("Post has been liked");

    }catch(err){
        res.status(500).json(err);
    }

}

export const deleteLikes=async(req,res)=>{
    const q="Delete from likes where user_id=$1 and post_id=$2";

    try{
        const data = dataBase.query(q,[req.body.user_id,req.body.post_id]);
        res.status(200).json("Post has been disliked");

    }catch(err){
        res.status(500).json(err);
    }

}