import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart, removeFromCart, cartButtonReset, checkout} = useContext(ShopContext);
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {product.product_images
                    // Filter out the image at index 0
                    .filter((_, index) => index !== 0)
                    // Map over the filtered array to render images
                    .map((image_url, indexs) => (
                    <img
                        key={indexs}
                        src={image_url}
                        alt={`Product Image ${indexs + 1}`} // Add 1 to index for alt text
                        onClick={() => window.scrollTo(0, 0)}
                    />
                    ))}
                </div>
                <div className="productdisplay-img">
                    {product.product_images.map((image_url, index)=>(index === 0 && (
                    <img className='productdisplay-main-img' src={image_url} alt="" />)))}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <div className="product-seller">
                    {product.seller}
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">{product.price} DA</div>
                </div>
                <h2>Product Details</h2>
                <div className="product-description">{product.description}</div>
                <div className="productcategory">
                    {product.category}
                </div>
                        {cartButtonReset(product.id) === false && <button onClick={()=>{addToCart(product.id)}} className='add-to-cart-btn'>ADD TO FAVORITES</button>}
                        {cartButtonReset(product.id) === true && <button onClick={()=>{removeFromCart(product.id)}} className='remove-from-cart-btn'>REMOVE FROM FAVORITES</button>}
                        <button onClick={()=>{checkout(product.id)}} className='order-btn'>PLACE AN ORDER</button>
            </div>
        </div>
    )
}
