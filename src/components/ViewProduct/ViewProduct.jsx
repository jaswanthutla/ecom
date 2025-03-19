import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const ViewProduct =() => {
    
    const token=localStorage.getItem("JwtToken");
    const param=useParams();
    const navigator=useNavigate();
    const {id}=param;
    const[product,setProduct]=useState({});
    const onUpdateProduct=(id)=>{
        navigator(`/updateProduct/${id}`);
    }
    const onDeleteProduct = async (id) => {
      const token = localStorage.getItem("JwtToken");
      const url = `http://localhost:8080/products/deleteProduct/${id}`;
  
      try {
          const response = await fetch(url, {
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });
  
          if (response.ok) {
              alert("Product deleted successfully!");
              navigator("/products")
          } else {
              const errorMessage = await response.text();
              alert(`Failed to delete product: ${errorMessage}`);
          }
      } catch (error) {
          console.error("Error deleting product:", error);
          alert("An error occurred while deleting the product.");
      }
  };
  
    useEffect(()=>{
        const viewProduct=async()=>{
            const url=`http://localhost:8080/products/getById/${id}`;
            const options={
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            const response=await fetch(url,options);
            console.log(response);
            
            const data=await response.json();
            console.log(data);
            
            setProduct(data);
          
            
        }
        viewProduct();
     
    },[])
    
  return (
    <>
    return (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>
      <img
        src={`data:${product.imgType};base64,${product?.imageData}`} // Display the image
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Release Date:</strong> {product.releaseDate}</p>
      </div>
      <div className="action-buttons">
        <button className="update-button" onClick={()=>{onUpdateProduct(id)}}>Update</button>
        <br/>
        <button className="delete-button" onClick={()=>{onDeleteProduct(id)}}>Delete</button>
      </div>
    </div>
  );
    </>
  )
}

export default ViewProduct