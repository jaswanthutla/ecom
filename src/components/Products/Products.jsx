import React, { useEffect } from 'react'
import { useState } from 'react'
import './index.css'
import Product from '../Product/Product.jsx';
const Products = () => {
  const [products,setProducts]=useState([]);
  const token=localStorage.getItem('JwtToken')
  
  
  useEffect( ()=>{
   const  getProducts=async()=>{
    try{
      const url="http://localhost:8080/products/getAllProducts";
      const options={
         method:"GET",
          headers:{
            "Content-Type":'application/json',
            "Authorization":`Bearer ${token}`
          }
      }
      const response =await fetch(url,options);
      console.log(response);
      const data=await response.json();
      console.log(data);
      setProducts(data);
      console.log(products);

    }
    catch(e)
    {
      console.log("error fetching the products"+e);
      
    }
  }
    getProducts();
      
  },[])

  return (
    <>
      <div>
        <h1  className="products-heading">Find Everything You Need in One Place</h1>
        <div className="products-container">
          <ul className="products-flex">
            {products.map((eachItem) => (
              <li key={eachItem.id}>
                <Product productDetilas={eachItem} key={eachItem.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products