import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setImage] = useState(null); // For storing the selected image file
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (!token) {
      // Redirect to login if token is not available
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', productImage);
  
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      console.log('Product added successfully');
      // Optionally, redirect to a success page or refresh the product list
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add product');
    }
  };

  const handleImageChange = (e) => {
    // Handle file input change to update the image state
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default Products;
