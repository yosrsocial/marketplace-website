import React from 'react'
import { useState, useEffect } from 'react';
import logo from '../Assets/p1_product_i1.jpg';
import './New.css'
import { Item } from '../Items/Item'
import api from '../api-requests'

export const New = () => {
// api for products: http://127.0.0.1:8000/api/products/


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const response = await api.get('/products/');
          //console.log('response:', response)
          setData(response.data);
        } catch (error) {
          console.error(error); // Handle errors
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className = 'New'>
        <div className="new-item">
        <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='new-item1'>
     {/* Check if data is available and is an array before mapping */}
      {data && Array.isArray(data) ? (
      data.map((item, i) => (
        <Item
          key={i}
          id={item.id}
          title={item.title}
          price={item.price}
          seller={item.seller}
          image={item.image}
        />
      ))
    ) : (
      <p>No data available yet</p>
    )}
        </div>
          )}
    </div>
              
        </div>
    </div>
  )
}
