import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import HomePage2 from '../../assets/HomePage2.webp'
const Home = () => {
  const navigator=useNavigate();
  const onChange=()=>{
    navigator("/products")
  }
  return (
    <>
      <div className='main-container' style={{ 
      backgroundImage: `url(${HomePage2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '90vh'
    }}>
      <h1 className='main-heading'>Shop Smart, Save More – Explore Our Collections</h1><br/>
      <button onClick={onChange}>Shop More</button>
    </div>
        
    </>
  )
}

export default Home