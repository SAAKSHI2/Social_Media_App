import { useState } from "react";
import "../css/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Register=()=>{

    const navigate = useNavigate();

    const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    })

    const [err,setErr] = useState(null);


    const handleChange =(e)=>{
           setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick=async(e)=>{
        e.preventDefault();
       try{

        await axios.post("http://localhost:3001/api/auth/register",userDetails,{
            withCredentials:true
        });
        navigate("/");
       }catch(err){
        console.log(err);
        setErr(err.response.data);

       }
         
    }



    return(
    <div className="register">
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
                <span> Do you have an account?</span>
                <Link to="/">
                <button>Login</button>
                </Link>

            </div>
            <div className="right">
                <h1>Register</h1>
                <form action="">
                  <input type="text" placeholder="username" onChange={handleChange} name="username"/>
                  <input type="password" placeholder="password" onChange={handleChange} name="password"/>
                  <input type="email" placeholder="email" onChange={handleChange} name="email"/>
                  <input type="text" placeholder="name" onChange={handleChange} name="name"/>
                  {err}
                  <button onClick={handleClick}>Register</button>
                </form>
            </div>

        </div>

    </div>
    )
}

export default Register;