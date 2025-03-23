import React, { useEffect, useState, useContext } from 'react';
import './index.css';
import Product from '../Product/Product.jsx';
import { SearchContext } from '../Context.jsx'; // ✅ Import using correct name

const Products = () => {
  const { searchText } = useContext(SearchContext); // ✅ Use correct context name
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('JwtToken');
  
  const getAllProducts = async () => {
    try {
      const url = 'http://localhost:8080/products/getAllProducts';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError('Error fetching products: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="products-heading">Find Everything You Need in One Place</h1>
      <div className="products-container">
        <ul className="products-flex">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((eachItem) => (
              <Product productDetilas={eachItem} key={eachItem.id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Products;
