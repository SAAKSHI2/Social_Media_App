import { useContext, useState } from "react";
import "../css/update.css";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Update=({setOpenUpdate,user,setUserInfo,setPosts})=>{

    const [userDetails,setUserDetails] = useState();
    const [bio,setBio] = useState(user.bio);
    const [username,setUsername] = useState(user.username);
    const [location, setLocation] = useState(user.location);
    const [profile_picture,setProfilePicture] = useState([]);
    const [email,setEmail] = useState(user.email);

    const[image,setImage] = useState([]);


    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const handleClick = async(e)=>{
        e.preventDefault();

        try{
            console.log(user);

            const form = new FormData();
            form.append("profile_picture",profile_picture);

            form.append("bio",bio);
            form.append("user_id",user.user_id);
            form.append("username",username);
            form.append("location",location);
            form.append("email",email);

            const uploadPost = await axios.put("http://localhost:3001/api/users/",form,{
                withCredentials:true
            }); 
            const data = uploadPost.data;
            
            setCurrentUser((prev)=>({...prev,profile_picture:(data.profile_picture===null)?"/images/user.png":data.profile_picture}))

            setUserInfo(data);

            setPosts([]);
            const res = await axios.get("http://localhost:3001/api/posts/"+user.user_id,{
                withCredentials:true
            });
            setPosts(()=>res.data);            

            setOpenUpdate(false); 

        }catch(err){
            console.log(err);
        }

    }

    const handleImage=(e)=>{
        setProfilePicture(e.target.files[0]);
        const file = e.target.files[0];

        // Display the uploaded image in the img tag
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }


    return (
        <div className="update">
               <button className="cut" onClick={()=>{setOpenUpdate(false); }}>X</button>
            <div className="updateForm">
                <div className="forImage">
                <img src={image.length==0?(user.profile_picture!=null?user.profile_picture:"/images/user.png"):image} alt="profile pic" />
                <label>Profile Pic</label>
                <input type="file" placeholder="Add picture" onChange={(e)=>{handleImage(e)} } />


                </div>

                <div className="details">
                <label>Username</label>
                <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value);setCurrentUser((prev)=>({...prev,username:e.target.value}))}} value={username} />
                <label>Bio</label>
                <input type="text" placeholder="add bio" onChange={(e)=>{setBio(e.target.value);setCurrentUser((prev)=>({...prev,bio:e.target.value}))}} value={bio}/>
                <label>Location</label>
                <input type="text" placeholder="location" onChange={(e)=>{setLocation(e.target.value);setCurrentUser((prev)=>({...prev,location:e.target.value}))}} value={location}/>
                <label>Email</label>
                <input type="text" placeholder="add email" onChange={(e)=>{setEmail(e.target.value);setCurrentUser((prev)=>({...prev,email:e.target.value}))}} value={email}/>
                
                <button onClick={(e)=>handleClick(e)}>update</button>
                </div>
               
               

            </div>

           

        </div>
    )

}
export default Update;