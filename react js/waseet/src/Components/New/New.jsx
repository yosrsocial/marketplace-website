import React from 'react'
import { useState, useEffect } from 'react';
import logo from '../Assets/p1_product_i1.jpg';
import './New.css'
import { Item } from '../Items/Item'

export const New = () => {
// api for products: http://127.0.0.1:8000/api/products/


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/', {
          method: 'GET',
          headers: {'Content-Type': 'application/json',}
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

/*{data.map((item, i)=>{
                          return <Item key={i} id={item.id} title={item.name} price={item.price} seller={item.seller}/> 
                      })}
                              <div>
  {productImages.map((item, i)=>{
            return <Item key={i} productImages={item.productImages}/>
          })}
        </div>
                      */ 


  return (
    <div className = 'New'>
        <div className="new-item">
        <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='new-item1'>
          {data.map((item, i)=>{
            return <Item key={i} id={item.id} title={item.title} price={item.price} seller={item.seller} product_images= {item.product_images}/> 
          })}
        </div>
          )}
    </div>
              
        </div>
    </div>
  )
}
