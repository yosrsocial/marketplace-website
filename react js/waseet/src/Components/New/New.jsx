import React from 'react'
import './New.css'
import data_product from '../Assets/data'
import { Item } from '../Items/Item'

export const New = () => {
  return (
    <div className = 'New'>
        <div className="new-item">
            {data_product.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
            })}
              
        </div>
    </div>
  )
}
