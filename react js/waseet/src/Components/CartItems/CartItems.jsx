import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItem = () => {
    const {data, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
    return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        
        {Object.keys(cartItems).map((itemId)=>{
            const quantity = cartItems[itemId];
            const product = data.find((item) => item.id === Number(itemId));

            if(quantity > 0 && product){
                return (
                <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={product.image} alt="" className='carticon-product-icon' />
                    <p>{product.title}</p>
                    <p>{product.price} DA</p>
                    <button className='cartitems-quantity'>{quantity}</button>
                    <p>{product.price*quantity} DA</p>
                    <img className = 'cartitems-remove-icon' src={remove_icon} onClick={() => {removeFromCart(product.id)}} alt="" />
                </div>
                <hr />
            </div>
                )
            }

            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart totals</h1>
                <div>
                    <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>{getTotalCartAmount()} DA</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                    <p>shipping fee</p>
                    <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>{getTotalCartAmount()} DA</h3>
                    </div>
                </div>
                <a href ='/Checkout' className='custom-button'>Proceed To Checkout</a>
            </div>
            <div className="cartitems-promocode">
                <p>if you have a promocode enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code'/>
                    <button>Submit</button>
                </div>
        </div>
        </div>

    </div>
    )
}

export default CartItem