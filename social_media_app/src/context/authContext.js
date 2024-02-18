import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser] = useState({});
    const [friends,setFriends] = useState([]);
    // const navigate = useNavigate();

    console.log(process.env.REACT_APP_BACKEND_URL);

    const login=async(inputs)=>{
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"api/auth/login",inputs,{
            withCredentials:true
        });
        console.log("cookie created");
        console.log(res);
        const profile_picture = res.data.profile_picture!=null?res.data.profile_picture:"/images/user.png";
         setCurrentUser(({...res.data,profile_picture:profile_picture}));       

    }

    const refetch=async()=>{
     
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/users/refetch",{
            withCredentials:true
        });
       
        const profile_picture = res.data.profile_picture!=null?res.data.profile_picture:"/images/user.png";
        setCurrentUser(({...res.data,profile_picture:profile_picture})); 
      
    }



    useEffect(()=>{
        const getFriends=async()=>{
            try{
                if(currentUser.user_id){
                    const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/friends/"+currentUser.user_id);
                    setFriends(res.data);
                }
            
            }catch(err){
                console.log(err);
            }
    
        }
        getFriends();
        
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser , login, friends, setFriends,setCurrentUser,refetch}}>
        {children}
        </AuthContext.Provider>
    )
}