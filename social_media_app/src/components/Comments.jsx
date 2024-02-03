import { useContext, useEffect, useState } from "react";
import "../css/comments.css";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Comments=({post_id})=>{

    const {currentUser} = useContext(AuthContext);
    // const [comments,setComments] = useState([{time:"5min ago",username:"someone",comment:"hello wow loking",profilePic:"https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},{time:"5min ago",username:"someone",comment:"hello wow loking",profilePic:"https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}]);
    const [comments,setComments] = useState([]);
    const [writeComment,setWriteComment] = useState("");



    const getComment = async()=>{
        try{
            console.log("get Comment entered",post_id);

            const data = await axios.get("http://localhost:3001/api/comments?post_id="+post_id);
            console.log(data.data);
            setComments(data.data);
        }catch(err){
            console.log(err);
        }
    }


    const handleClick=async()=>{
        try{
            const data = await axios.post("http://localhost:3001/api/comments",{post_id:post_id,content:writeComment,user_id:currentUser.user_id});
            setComments((prev)=>([{...data.data,profile_picture:currentUser.profile_picture,username:currentUser.username},prev]));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        console.log("comments");
        getComment();
        console.log(comments);

    },[])
    return(
        <div className="comments">
            <div className="write">
                <img src={currentUser.profile_picture} alt="profilepic"/>
                <input type="text" placeholder="write comment" onChange={(e)=>setWriteComment(e.target.value)}/>
                <button onClick={handleClick}>send</button>

            </div>
            {comments.length>0?
             comments.map((comment)=>{
                return(
                    <div className="comment">
                    <img src={comment.profile_picture===null?"/images/user.png":comment.profile_picture} alt="commentImg"/>
                    <div className="info">
                        <span>{comment.username}</span>
                        <p>{comment.content}</p>
                   </div>

                   <span className="time">{comment.created_at}</span>

               </div>
                )
             })
           :null }
        </div>
    )
}
export default Comments;