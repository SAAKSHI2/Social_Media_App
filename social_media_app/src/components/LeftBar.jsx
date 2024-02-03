import { useContext, useState } from "react";
import "../css/leftBar.css";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const LeftBar=()=>{
    const [name,setName] = useState("");
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="container">
                <Link to={`/profile/:${currentUser.user_id}`} style={{textDecoration:"none"}}>
                <div className="profile">
                     <img src={currentUser.profile_picture} alt="profile photo"/>
                     <h1>Welcome, {currentUser.username} !</h1>
                 
                </div>
                </Link>

                <div className="details">
                    <h1>Followers : {currentUser.follower}</h1>
                    <h1>Posts : {currentUser.posts}</h1>
                </div>
            </div>
            
        </div>
    )
}
export default LeftBar;