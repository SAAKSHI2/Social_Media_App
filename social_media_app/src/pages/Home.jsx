import { useContext, useEffect, useState } from "react";
import "../css/home.css";
import "../css/posts.css";
import Posts from "../components/Posts";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ()=>{


    const [ posts,setPosts] = useState([{
        username:"",
        time:"",
        profile_picture : "",
        media_data :"",
        content: ""
    }]
    );

    const navigate = useNavigate();

    const [image,setImage] = useState([])

    const {currentUser,refetch} = useContext(AuthContext);

    const getPost = async()=>{
        try{
            setPosts([]);
            const post = await axios.post("http://localhost:3001/api/posts/",{userID : currentUser.user_id},{
                withCredentials:true
            });
            setPosts(post.data);
           }catch(err){
            console.log(err);        
           }
    }

    useEffect(()=>{
        const data = async()=>{
           try{
            getPost();
            await refetch();
           } catch(err){
            navigate('/');
            
           }
        }
        data();
      
        
       
    },[])
    
    const [content, setContent] = useState("");
    const [file,setFile] = useState(null);


    const handleClick = async(e)=>{
        e.preventDefault();

        try{

            const form = new FormData();
            form.append("file",file);
            form.append("content",content);
            form.append("user_id",currentUser.user_id);

            const uploadPost = await axios.post("http://localhost:3001/api/posts/add",form,{
                withCredentials:true
            }); 
            const data = uploadPost.data;
            // console.log(data);
            // setPosts((prev)=>([{username:currentUser.username,media_data:data.media_data,content:content,created_at:data.created_at},...prev]))
            getPost();
            setImage([]);
            setContent("");

        }catch(err){
            console.log(err);
        }

    }

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
        const file = e.target.files[0];

        // Display the uploaded image in the img tag
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

     return (

        <div className="home">

            <div className="container">
                  <div className="addPost">
                       <img src={currentUser.profile_picture} alt="profile" />
                       <input type="text" placeholder="Add Post" onChange={(e)=>setContent(e.target.value)} value={content}/>
                       <button onClick={handleClick}>Post</button>
                  </div>
                  <div className="media">
                     <img src={image} alt="profile" hidden={image.length==0?true:false} />

                      <input type="file" name="file" onChange={(e)=>handleFile(e)}/>
                  </div>

            </div>
        
            <div className="posts">
                 {posts.map((ele)=>{  
                    
                    return(
                        <Posts key={ele.username} {...ele}  />
                    )
                 })}
              
            </div>
            



        </div>
     )
}

export default Home;