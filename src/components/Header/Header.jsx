import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './index.css';
import Products from '../Products/Products';
import { useState } from 'react';
import { SearchContext } from '../Context.jsx';
import { useContext } from 'react';

const Header = () => {
  const [text,setText]=useState();
  const {setSearchText,searchText}=useContext(SearchContext);

  const onText=(e)=>{
      setText(e.target.value);
  }
  const onButtonClick=()=>{
    setSearchText(text);
    
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <img className='logo navbar-brand' src={logo} alt="Logo" />
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className='nav-link' to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/addproduct">Add Product</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Cart</a>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <input 
                    className="form-control me-2 search-input" 
                    type="search" 
                    value={text}
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={onText}
                  />
                  <button onClick={onButtonClick} className="btn btn-outline-success search-button" type="submit">Search</button>
                  
                </li>
              </ul>

            </div>
          </div>
        </nav>
      </div>
      
    </>
  );
};

export default Header;