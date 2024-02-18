import "../css/profile.css";
import { useContext, useEffect, useState } from "react";
import Posts from "../components/Posts";
import "../css/posts.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Update from "../components/Update";



const Profile = ()=>{

    const userId = useLocation().pathname.split("/")[2];
    const [userInfo,setUserInfo] = useState({});
    const [posts,setPosts] = useState([]);
    const [isFollowed,setIsFollowed] = useState(false);
    const [hideUpload,setHideUpload] = useState(true);
    const [openUpdate,setOpenUpdate] = useState(false);
    const navigate = useNavigate();

    const {currentUser,friends,setFriends,refetch} = useContext(AuthContext);
    
    const getUserInfo =async ()=>{
        try{
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/users/find/"+userId[1],{
                withCredentials:true
            });
          
            setUserInfo(res.data);
        }catch(err){
            console.log(err);
        }

        //set user is followed or not
        if(friends.length>0&& friends.includes(parseInt(userId[1]))){
            setIsFollowed(true);
        }
    }
    const getPosts =async ()=>{

        try{
            setPosts([]);
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/posts/"+userId[1],{
                withCredentials:true
            });
            setPosts(()=>res.data);
        }catch(err){
            console.log(err);
        }
    }


    const handleClick = async(follow)=>{
        if(follow){
            try{
                const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"api/friends/follow",{user_id1:currentUser.user_id,user_id2:parseInt(userId[1])},{
                    withCredentials:true
                });
                const updatedArray = friends.map((element) => element + parseInt(userId[1]));
                setFriends(updatedArray);
                setIsFollowed(true);

            }catch(err){
                console.log(err);
            }
        }else{
            try{
                const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"api/friends/unFollow",{user_id1:currentUser.user_id,user_id2:parseInt(userId[1])},{
                    withCredentials:true
                });
                const updatedArray = friends.filter((element) => element !== parseInt(userId[1]));
                setFriends(updatedArray);
               setIsFollowed(false);

            }catch(err){
                console.log(err);
            }

        }
    
    }


    useEffect(()=>{
        const data = async()=>{
            try{
                await refetch();
               } catch(err){
                navigate('/');
                // alert(err.message);            
               }
        }
        data();
        getUserInfo();
        getPosts();

    },[userId])

    return (
        <div className="profile">
            <div className="images">
                 <img src={userInfo.profile_picture===null?"/images/user.png":userInfo.profile_picture} alt="profile" />
              
            </div>
            <div className="profileContainer">
                    <div className="bioo">
                    <p>{userInfo.username}</p>
                    <span className="bio">{userInfo.bio}</span>
                    <span>{userInfo.location}</span>
                    </div>
                

                <div className="follower">
                    <div className="details">
                        <p>posts : <span>{userInfo.posts}</span></p>
                        <p>Follower : <span>{userInfo.follower}</span></p>
                        <p>Following : <span>{userInfo.following}</span></p>
                    </div>
                    <div className="button">
                    {currentUser.user_id==userInfo.user_id?<button onClick={()=>setOpenUpdate(true)}>update</button>:!isFollowed?<button onClick={()=>handleClick(true)}>Follow</button>:<button onClick={()=>handleClick(false)}>following</button>}
                    </div>
             </div>
              
            </div>
            <div className="posts">
                 {posts.map((ele)=>{ 
                    
                    return(
                        <Posts key={ele.username} {...ele}  />
                    )
                 })}
              
            </div>
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={userInfo} setUserInfo={setUserInfo} setPosts={setPosts}/>}
          
        </div>
     )
}

export default Profile;