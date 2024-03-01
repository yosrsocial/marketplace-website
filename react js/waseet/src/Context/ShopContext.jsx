import React, { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import data from '../Components/Assets/data';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < data.length +1 ; index++) {
        cart[index] = 0;    
    }

    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());


    const addToCart = (itemId)=> {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
    }
    
    useEffect(() => {
    }, [cartItems])

    const removeFromCart = (itemId)=> {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = data.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
                console.log("total:", totalAmount);
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    

    const contextValue = {data, cartItems, getTotalCartAmount, getTotalCartItems, addToCart, removeFromCart,};
    return ( 
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;