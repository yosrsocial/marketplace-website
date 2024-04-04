import React, { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState();
    const [cartButtononClickStatus, setCartButtononClickStatus] = useState(false);


    const addToCart = (itemId)=> {
        setCartButtononClickStatus(true);

        let itemInfo = data.find((product) => product.id === itemId);

    const cartData = {
    product: {
        id: itemInfo.id,
        title: itemInfo.title,
    },
    user: {
        id: 1,
    },
    };

    try {
    const existingCartData = localStorage.getItem('cartData');
    let cartJSON = existingCartData ? JSON.parse(existingCartData) : [];

    cartJSON.push(cartData);
    const cartString = JSON.stringify(cartJSON);
    localStorage.setItem('cartData', cartString);
    } catch (error) {
        var newCartList = [];
        newCartList.push(cartData)
        var cartString = JSON.stringify(newCartList)
        localStorage.setItem('cartData', cartString)
    }

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    }
    
    useEffect(() => {
            // Fetch data from your API endpoint
            fetch('http://127.0.0.1:8000/api/products/')
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    // Initialize cart items based on fetched data
                    const defaultCart = {};
                    data.forEach(item => {
                    defaultCart[item.id] = 0;
                    });
                    setCartItems(defaultCart);
                })
                .catch(error => console.error('Error fetching data:', error));
        
    }, [] )

    const removeFromCart = (itemId)=> {
        setCartButtononClickStatus(false);
        try {
            const existingCartData = localStorage.getItem('cartData');
            let cartJSON = JSON.parse(existingCartData);
            cartJSON = cartJSON.filter((item) => item.product.id !== itemId);
            localStorage.setItem('cartData', JSON.stringify(cartJSON));
        } catch(error) {
            console.error('Error removing item from cart:', error);
        }

        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = data.find((product) => product.id === Number(item))
                totalAmount += itemInfo.price * cartItems[item];
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
    

    const contextValue = {data, cartItems, cartButtononClickStatus, getTotalCartAmount, getTotalCartItems, addToCart, removeFromCart,};
    return ( 
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;