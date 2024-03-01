import React, { useState } from 'react';
import './sell.css';

const SellItem = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    images: [],
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // Handle image file selection
    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setFormData({ ...formData, images: selectedImages });
      };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission (e.g., send data to the server)
    console.log('Form submitted:', formData);
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
                    <label>
                        Images:
                        <input
                        className='image-input'
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    </div>
  );
};

export default SellItem;
