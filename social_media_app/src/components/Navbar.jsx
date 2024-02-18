import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Link, useNavigate } from 'react-router-dom';
import "../css/navbar.css";
import { AuthContext } from '../context/authContext';
import { useContext, useState } from 'react';
import axios from 'axios';


const Navbar = ()=>{
    const {currentUser} = useContext(AuthContext);
    const [searchFriend,setSearchFriend] = useState("");
    const navigate = useNavigate();

    const handleLogout=async()=>{

        try{
           const res= await axios.post(process.env.REACT_APP_BACKEND_URL+"api/auth/logout",null,
            {
                withCredentials:true
            }
            );
            navigate('/');
            // window.location.reload();
        }catch(err){
            console.log(err);
        }
       
    }

    const handleEnterKey=async(e)=>{
         if(e.key==="Enter"){
            try{

                const res=await axios.post(process.env.REACT_APP_BACKEND_URL+"api/users/findUserID",{username:searchFriend});
                if(res.data==null){
                    console.log("user not found",res.data);
                    alert("user not found")
                } else{
                    navigate("/profile/:"+res.data);
                }
            }catch(err){
                console.log(err);
            }
            setSearchFriend("");
         }
    }

    return (
        <div className='navbar'>
            <div className='left'>
           
                        <div className='logo'>
                                <img src="/images/social_media.png" alt="appIage" />
                                <Link to="/home" style={{textDecoration:"none"}}>
                                 <span>SocialMedia</span>
                                 </Link>

                        </div>
        

              
                 <Link to="/home" style={{textDecoration:"none"}}>
                        <HomeRoundedIcon/>
                   </Link>


                 {/* <DarkModeOutlinedIcon/> */}
                 
                
            </div>
            <div className='center'>
                    <div className='search'>
                            <SearchRoundedIcon/>
                            <input type="text" placeholder='search friends' value={searchFriend} onChange={(e)=>setSearchFriend(e.target.value)} onKeyDown={handleEnterKey}/>
                        </div>

            </div>
            <div className='right'>
                {/* <PeopleAltOutlinedIcon/>
                <div className="user">
                     <img src={currentUser.profile_picture} alt="img"/>
                     <span>{currentUser.username}</span>
                </div> */}

                <button onClick={handleLogout}>logout</button>

            </div>
        </div>
     )
}

export default Navbar;