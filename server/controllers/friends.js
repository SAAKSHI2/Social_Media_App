import dataBase from "../connect.js";

export const getFriends=async(req,res)=>{
    const q = "select f.user_id2 from users JOIN friendships as f ON (f.user_id1=user_id) where user_id=$1";
    try{
        const data = await dataBase.query(q,[req.params.userID]);
        // console.log(data.rows);
        const friends =[];
        data.rows.forEach((row)=>friends.push(row.user_id2));

        res.status(200).json(friends);
    } catch(err){
        console.log(err.message);
        res.status(500).json(err);
        
    }

}

export const followFriend=async(req,res)=>{
    const q = "Insert into friendships(user_id1,user_id2) values($1,$2)";
    try{
        const data = await dataBase.query(q,[parseInt(req.body.user_id1),parseInt(req.body.user_id2)]);
        res.status(200).json("followed");
    } catch(err){
        console.log(err);
        res.status(500).json(err);
        
    }

}

export const unFollowFriend=async(req,res)=>{
    const q = "delete from friendships where user_id1=$1 and user_id2=$2";
    try{
        const data = await dataBase.query(q,[parseInt(req.body.user_id1),parseInt(req.body.user_id2)]);
        res.status(200).json("unfollowed");
    } catch(err){
        res.status(500).json(err);
        
    }

}

