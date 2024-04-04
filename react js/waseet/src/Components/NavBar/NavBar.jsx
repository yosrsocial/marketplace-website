import React, {useContext, useState} from 'react'
import './NavBar.css'
import logoImage from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png'; 
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import search_icon from '../Assets/icons8-search-20.png';

const NavBar = () => {

  const [menu, setmenu] = useState("Home")
  const {getTotalCartItems} = useContext(ShopContext)

  return (
    <nav className="navbar">
      <nav className='nav-logo'>
      <nav className='home-button'>
          <Link to = '/'><img src={logoImage} alt="waseet" /></Link>
        </nav>
      <nav className="logo-name">
        <p>Bi3ly</p>
      </nav>
      </nav>
      <nav className="search">
        <img src={search_icon} alt="" />
        <input type="text" className = 'search-input' placeholder='Search'/>
      </nav>
      <div className="action-buttons">
        <nav className="sell-button">
        <a href ='/AddListing' className='custom-button'>Sell</a> 
        </nav>
        <nav className="login-button">
          <a href ='/Login' className='custom-button'>My Account</a>
        </nav>
        <nav className='cart-button'>
          <Link to = '/Cart'><img src={cart_icon} alt="Cart" /></Link>
        </nav>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </nav>
  );
};

export default NavBar;
