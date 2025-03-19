import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [user,setName]=useState('');
    const[password,setPassword]=useState('');
    const [error,setError]=useState('');
    const[errorStatus,seterrorStatus]=useState('false');
    const navigator=useNavigate();
    //const[role,setRole]=useState('');

    useEffect(() => {
        const token = localStorage.getItem("JwtToken");
        if (token) {
            navigator("/");  // Redirect to home if token exists
        }
    }, [navigator]);

    const onSubmitSuccess=(jwtToken)=>{
        localStorage.setItem("JwtToken",jwtToken);
        navigator("/")
    }
    const onSubmitFailure=(errorMsg)=>{
        seterrorStatus(true);
        setError(errorMsg);
    }
    const formSubmit=async (e)=>{
        e.preventDefault();
        const userDetials={
            user:user,
            password:password,
            // role:role
        }
        const url="http://localhost:8080/user/login";
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetials)
        }
        const response=await fetch(url,options);
        console.log(response);
        
        const data=await response.text();
        console.log(data);
        if(response.ok)
        {
            onSubmitSuccess(data);
            
        }
        else 
        {
            onSubmitFailure(data);
        }
        

    }
  return (
   <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
            <div className='card-body'>
                <h1 className='text-center'>Login</h1>
            <form onSubmit={formSubmit}>
        
                <input id="name" placeholder='enter username' type='text' className='pt-2 form-control' value={user} onChange={(e)=>setName(e.target.value)}/>
                <br/>
       
                <input id="pass" placeholder='enter password' type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
        
               {/* <input id="role" placeholder='enter role' type='text' className='form-control' value={role} onChange={(e)=>setRole(e.target.value)}/> */}
                 <br/>
                <input type='submit' value="Login" className="btn btn-primary w-100"/>
            </form>
           <p className='text-center pt-2'>Don't have account <a href='/signup'>Sign up</a></p>

           {errorStatus && error}
            </div>
        </div>
   </div>
  )
}

export default Login