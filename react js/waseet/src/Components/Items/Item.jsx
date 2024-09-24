import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

//<img onClick={window.scrollTo(0,0)} src={props.product_images} alt="" />


/*{props.productImages.map((imageUrl, index) => (
          <img 
            key={index} // Make sure to provide a unique key for each image
            onClick={() => window.scrollTo(0, 0)} // You can pass a function directly to onClick
            src={imageUrl} 
            alt={`Image ${index}`} // Provide a descriptive alt text for accessibility
          />
        ))}*/


/*
{props.product_images.map((image_url, index)=> (index === 0 && (<img className='item-img' key={index} src={image_url} onClick={() => window.scrollTo(0, 0)}/>)))}
*/

export const Item = (props) => {
  return (

    <div className= 'item'>
        <div className="image">
        <Link to={`/product/${props.id}`}>{props.image.length > 0 && ( 
          <img className="item-img" key={0} src={props.image} onClick={() => window.scrollTo(0, 0)} />)}
        </Link>
        </div>
        <div className="titlenprice">
          <p>{props.title}</p>
          <div className="item-prices">
              <div className="item-price-new">
                  {props.price} DA
              </div>
          </div>
        </div>
        <div className='seller'>
              {props.seller}
        </div>
    </div>
  )
}
