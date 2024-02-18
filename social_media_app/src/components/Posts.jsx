import { Link } from "react-router-dom";
import "../css/posts.css";
import { useContext, useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Comments from "./Comments";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import moment from "moment";


const Posts = (userInfo)=>{
        const [totalLikes,setTotalLikes] = useState([]);
        const [commentsOpen,setCommentsOpen] = useState(false);
        const [createdAt,setCreatedAt] = useState(moment(userInfo.created_at).fromNow());

        const {currentUser} = useContext(AuthContext);


        const getLikes = async()=>{
          try{
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/likes?post_id="+userInfo.post_id,{
              withCredentials:true
            });

            setTotalLikes(res.data);
          }catch(err){
            console.log(err);
          }
        }


        const handleLike=async(liked)=>{
          await likeOrUnlike(liked);
         
        }

        const likeOrUnlike= async(liked)=>{
             if(liked){
                  try{
                    const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"api/likes",{user_id:currentUser.user_id,post_id:userInfo.post_id},{
                      withCredentials:true
                    });
                    setTotalLikes((prev)=>[...prev,currentUser.user_id]);
                  }catch(err){
                    console.log(err);
                  }
             } else{
              console.log("entered unlike")

                  try{
                    const res = await axios.delete(process.env.REACT_APP_BACKEND_URL+"api/likes",{user_id:currentUser.user_id,post_id:userInfo.post_id},{
                      withCredentials:true
                    });
                    setTotalLikes((prev)=>(prev!=currentUser.user_id));
                  }catch(err){
                    console.log(err);
                  }
             }
        }


        useEffect(()=>{
          getLikes();

        },[])

        useEffect(() => {
          const interval = setInterval(() => {
            const formattedTimeAgo = moment(userInfo.created_at).fromNow();
            setCreatedAt(formattedTimeAgo);
          }, 60000); // Update every minute

          return () => clearInterval(interval);
        }, [userInfo.created_at]);


        return(
            <div className="post">
                  <div className="user">
                    <div className="userInfo">
                         <img src={userInfo.profile_picture===null?"/images/user.png":userInfo.profile_picture} alt="postImage" />
                         
                         <div className="details">
                            <Link to={`/profile/:${userInfo.user_id}`} style={{textDecoration:"none",color:"inherit"}}>
                            
                            <span className="name">{userInfo.username}</span>
                          
                            </Link>
                            <span className="date">{createdAt}</span>
                            
                         </div>
                    </div>
                  

                  </div>
                  <div className="content">
                    <p>{userInfo.content}</p>
                    <img src={userInfo.media_data} alt="postImage" />

                 </div>
                 <div className="likesComments">
                        <div className="liked">
                        {totalLikes.length>0 && totalLikes.includes(currentUser.user_id)?<FavoriteOutlinedIcon style={{color:"red"}} onClick={()=>handleLike(false)}/>:<FavoriteBorderOutlinedIcon onClick={()=>handleLike(true)}/>}
                        {totalLikes.length==0?0:totalLikes.length} likes
                        </div>
                        <div className="liked" onClick={()=>setCommentsOpen(!commentsOpen)}>
                       <CommentOutlinedIcon/>
                        12 comments
                        </div>
                    
                 </div>

                 {commentsOpen&& <Comments post_id={userInfo.post_id}/>}
            </div>
        )
}

export default Posts;