import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [user,setName]=useState('');
  const[password,setPassword]=useState('');
  const[role,setRole]=useState('');
  const navigate=useNavigate();
 const formSubmit=async (e)=>{
         e.preventDefault();
         const userDetials={
             user:user,
             password:password,
             role:role
         }
         const url="http://localhost:8080/user/save";
         const options={
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify(userDetials)
         }
         const response=await fetch(url,options);
         console.log(response);
         
         const data=await response.json();
         console.log(data);
         if(response.ok)
         {
             navigate('/login')
             console.log("signed...");
             
         }
         else
         {
            console.log("sign up failed..");
            
         }
         
 
     }
   return (
    <div className="d-flex justify-content-center align-items-center vh-100">
         <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
             <div className='card-body'>
                 <h1 className='text-center'>Sign Up</h1>
             <form onSubmit={formSubmit}>
         
                 <input id="name" placeholder='enter username' type='text' className='pt-2 form-control' value={user} onChange={(e)=>setName(e.target.value)}/>
                 <br/>
        
                 <input id="name" placeholder='enter password' type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                 <br/>
         
                <input id="role" placeholder='enter role' type='text' className='form-control' value={role} onChange={(e)=>setRole(e.target.value)}/>
                  <br/>
                 <input type='submit' value="SignUp" className="btn btn-primary w-100"/>
             </form>
            <p className='text-center pt-2'>Already Registered <a href='/login'>Login</a></p>
             </div>
         </div>
    </div>
   )
}

export default SignUp