import React, { useEffect, useState } from 'react';
import './index.css'; // Import CSS for styling
import { useParams } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    releaseDate: '',
    imgName: '',
    imageFile: null, // Store the actual file separately
  });

  const { id } = useParams(); // Extract the `id` from the URL
  const [errStatus, setErrStatus] = useState(false);
  const token = localStorage.getItem("JwtToken");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        imgName: file.name, // Store only file name
        imageFile: file, // Store actual file separately
      }));
    }
  };

  // Fetch product details when `id` is present (for update)
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const url = `http://localhost:8080/products/getById/${id}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setProduct({
            ...data,
            imageFile: null, // Reset image file (if any)
          });
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Prepare product data (excluding the image file)
    const productData = { ...product };
    delete productData.imageFile; // Remove file object before sending JSON

    formData.append("product", JSON.stringify(productData));
    if (product.imageFile) {
      formData.append("imgFile", product.imageFile); // Append actual file
    }

    try {
      let url, method;
      if (id) {
        // Update existing product
        url = `http://localhost:8080/products/updateProduct/${id}`;
        method = "PUT";
      } else {
        // Add new product
        url = "http://localhost:8080/products/saveProduct";
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // No Content-Type needed for FormData
        },
        body: formData,
      });

      const data = await response.text();
      console.log("Response:", data);
      setErrStatus(true);

      // Reset form after successful submission
      setProduct({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        releaseDate: '',
        imgName: '',
        imageFile: null,
      });
    } catch (err) {
      console.error("Error saving/updating product:", err);
    }
  };

  return (
    <div className="add-product">
      <h1 className="add-product-title">{id ? "Update Product" : "Add New Product"}</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required={!id} // Image is required only for new products
          />
        </div>
        <div className="form-group">
          <button type="submit">{id ? "Update Product" : "Add Product"}</button>
        </div>
        {errStatus && <p>Product {id ? "Updated" : "Saved"} Successfully</p>}
      </form>
    </div>
  );
};

export default AddProduct;