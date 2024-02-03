import dataBase from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login=async(req,res)=>{
    const q = "Select * from users where username = $1";

  
    try{
        const check = await dataBase.query(q,[req.body.username]);
        if(check.rowCount==0){
            return res.status(404).json("user not found");
        } 
        const checkPassword = await bcrypt.compare(req.body.password,check.rows[0].password);
      
        if(checkPassword===true){
            check.rows[0].profile_picture = check.rows[0].profile_picture!=null?process.env.BACKEND_URL+"images/"+check.rows[0].profile_picture:null;
            const {password,...otherData} = check.rows[0];


            const token = jwt.sign({user_id:otherData.user_id,password:password},process.env.SECRET_KEY);

            res.cookie("accessToken",token,{
                httpOnly:true,
            }).status(200).json(otherData);
              
        } else{
            return res.status(400).json("wrong password");
        }

    } catch(err){
        res.status(500).json(err.message);
    }

}
export const register=async(req,res)=>{

    //check if user exists
    let q = "Select * from users where username = $1";
    console.log("entered register");

    try{
        const check = await dataBase.query(q,[req.body.username]);
        if(check.rowCount>0){
            return res.status(409).json("user already exists");
        }

        //else create new user
         q = "Insert into users (username,email,password) values($1,$2,$3)";


        //Hash password
        const hash = bcrypt.hash(req.body.password,10,(err,hash)=>{
            //store hashed password in database
             dataBase.query(q,[req.body.username,req.body.email,hash]); 
             res.status(200).json("User has been created"); 

        })
        

    } catch(err){
        return res.status(500).json(err.message);
    }
  
}
export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user has been logout")

}