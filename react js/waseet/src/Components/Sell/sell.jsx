import React, { useState } from 'react';
import {useEffect} from 'react';
import './sell.css';
import api from '../api-requests';

const FormData = require('form-data');
const username = localStorage.getItem('username');

const SellItem = () => {
  // State to hold form data
  const [categoryData, setcategoryData] = useState([]);
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    // Fetch data from your API endpoint
    api.get('categories/')  // Replace with your actual endpoint if needed
  .then(response => {
    setcategoryData(response.data);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    // Handle errors (e.g., display an error message to the user)
  });
}, [] )

// setFormData({ ...formData, seller: seller_name });
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  // Directly updates formData using its set method
  formData.set(name, value);
  // Updates state to reflect the changes
  setFormData(formData);
  };

    // Handle image file selection
    const handleImageChange = (event) => {
      const selectedFiles = event.target.files;
      console.log(selectedFiles)
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('product_images', selectedFiles[i]);
      }
    };

  // Handle form submission
const handleSubmit = (e) => {
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  e.preventDefault();
  api.post('products/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for image uploads
    },
  })
.then(response => {
    console.log('Product upload successful!');
  })
  .catch(error => {
    console.error('Error uploading product:', error);
    // Handle errors (e.g., display an error message to the user)
  });
  
};

  return (
    <div className='key-information'>
        <div className="key-information-container">
            <form onSubmit={handleSubmit}>
                <h2>Add Listing</h2>
                <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder='Name Your Product'
                />
                </label>
                <br />
                <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder='Add Description'
                />
                </label>
                <br />
                <label>
                Price:
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder='e.g. 1000DA'
                />
                </label>
                <br />
                <label >
                  Category:
                  <select name="category" onChange={handleInputChange}>
                  {categoryData != null && categoryData.map((item) => <option value={item.title}>{item.title}</option>)}
                  </select>
                </label>
                <br />
                <label >
                  Quantity:
                  <input type="number" name='quantity' value={formData.quantity} onChange={handleInputChange}/>
                </label>
                <br />
                <label >
                  Size:
                  <select name="size" value={formData.size} onChange={handleInputChange}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
                <br />
                <label >
                  Color:
                  <select name="color" value={formData.color} onChange={handleInputChange}>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Orange">Orange</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Beige">Beige</option>
                    <option value="Brown">Brown</option>
                    <option value="Violet">Violet</option>
                    <option value="Pink">Pink</option>
                  </select>
                </label>
                <br />
                <label>
                  Images:
                  <input
                  className='image-input'
                  type="file"
                  name="product_images"
                  value={formData.product_images}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                        />
                </label>
                <br />
                <input type="hidden" name="seller" value={username} />
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    </div>
  );
};

export default SellItem;
