import React, { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../Components/api-requests'

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState();
    const [cartButtononClickStatus, setCartButtononClickStatus] = useState(false);
    

    const cartButtonReset = (itemId) => {
        if(cartButtononClickStatus && cartItems[itemId] == 0){
            setCartButtononClickStatus(false)
            console.log('cartitem false:', cartItems[itemId])
            return false // false means 'add to cart'
        }else if(!cartButtononClickStatus && cartItems[itemId] == 0){
            console.log('cartitem false:', cartItems[itemId])
            return false // add to cart
        }else if(!cartButtononClickStatus && cartItems[itemId] != 0){
            setCartButtononClickStatus(true)
            console.log('cartitem true:', cartItems[itemId])
            return true //remove from cart
        }else if(cartButtononClickStatus && cartItems[itemId] != 0){
            console.log('cartitem false:', cartItems[itemId])
            return true // remove from cart
        }
    }

    const addToCart = (itemId)=> {
        setCartButtononClickStatus(true);
/*
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
    }*/

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    }
    
    useEffect(() => {
        // Fetch data from API endpoint
        const fetchData = async () => {
            try {
            const response = await api.get('/products/');
            setData(response.data);
            // Initialize cart items based on fetched data
            const defaultCart = {};
            response.data.forEach(item => {
                defaultCart[item.id] = 0;
            });
            setCartItems(defaultCart);
            } catch (error) {  // Corrected: Use parenthesis around error
            console.error('Error fetching data:', error);
            }
        };
        fetchData();
        }, []);

    const removeFromCart = (itemId)=> {
        setCartButtononClickStatus(false);
        /*
        try {
            const existingCartData = localStorage.getItem('cartData');
            let cartJSON = JSON.parse(existingCartData);
            cartJSON = cartJSON.filter((item) => item.product.id !== itemId);
            localStorage.setItem('cartData', JSON.stringify(cartJSON));
        } catch(error) {
            console.error('Error removing item from cart:', error);
        }
*/
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
    

    const contextValue = {data, cartItems, cartButtononClickStatus, cartButtonReset, getTotalCartAmount, getTotalCartItems, addToCart, removeFromCart,};
    return ( 
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;