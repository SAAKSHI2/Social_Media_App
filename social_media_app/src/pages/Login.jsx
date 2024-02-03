import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Login=()=>{

    const navigate = useNavigate();

    const [userDetails,setUserDetails] = useState({
        username:"",
        password:"",
    });

    const {login} = useContext(AuthContext);

    const [err,setErr] = useState(null);


    const handleChange =(e)=>{
           setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick=async(e)=>{
        e.preventDefault();
       try{

        await login(userDetails);
        navigate("/home");

       }catch(err){
        setErr(err.response.data);
       }
         
    }


    return(
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>Hello World</h1>
                <p>Lorem ipsum dolor sit amet consectetur, 
                    adipisicing elit. Sequi libero,
                     aperiam repudiandae minima quos 
                     vel cum sit explicabo eos consectetur
                      et adipisci consequuntur doloremque
                       laborum nisi ut neque quibusdam 
                       dolorem.

                </p>
                <span> Don't you have account?</span>

                <Link to="/register">
                <button>Register</button>
                </Link>
                

            </div>
            <div className="right">
                <h1>Login</h1>
                <form action="">
                  <input type="text" placeholder="username" onChange={handleChange} name="username"/>
                  <input type="text" placeholder="password" onChange={handleChange} name="password" />
                  {err}
                  <button onClick={handleClick}>Login</button>
                </form>
            </div>

        </div>

    </div>
    )
}

export default Login;