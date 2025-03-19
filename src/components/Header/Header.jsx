import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import './index.css'
const Header = () => {
  return (
    <>
    <div>
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div class="container-fluid">
    <img class="navbar-brand" className='logo' src={logo}/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">{/* //ms-auto pushes the elements to the right side as soon as possible as  */}
        <li class="nav-item">
        <Link className='nav-link' to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link className='nav-link' to="/products">Products</Link>
        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/addproduct">Add Product</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Cart</a>
        </li>
        <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
      </ul>
    </div>
  </div>
</nav>
    </div>
        
    </>
  )
}

export default Header