import React, { use } from 'react';
import './index.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const Product = (props) => {
  const { productDetilas } = props;
  const { brand, category,id, description, imageData, name, price, quantity, releaseDate } = productDetilas;
    const navigator=useNavigate();
  const viewProduct=(id)=>{
    navigator(`/viewProduct/${id}`)
  }
  return (
    <li className="product-item">
      {/* Product Image and Details */}
      <div className="product-details">
        {/*Base64 Encoding:Base64 is a way to encode binary data (like images) into a text format. This is useful when you need to transmit or store binary data in a text-based format (e.g., JSON).
        If your backend sends the image as a Base64-encoded string, you need to decode it in the frontend to display it. The data:image/jpeg;base64, prefix tells the browser that the following string is a Base64-encoded image. */}
        <img
          src={`data:image/jpeg;base64,${imageData}`} // Assuming imageData is a base64 string
          alt={name}
          className="product-image"
          style={{ width: '250px', height: '200px' }}
        />

        {/* Product Details */}
        <div>
          <h3>{name}</h3>
          <ul>
            <li><strong>Brand:</strong> {brand}</li>
            
            <li><strong>Price:</strong> ${price}</li>
              {/* Action Buttons */}
      <div className="action-buttons">
        <button className="add-to-cart">Add to Cart</button><br/>
        <button className="view-details" onClick={()=>viewProduct(id)}>View Details</button>
      </div>
        
          </ul>
        </div>
      </div>

    
    </li>
  );
};

export default Product;