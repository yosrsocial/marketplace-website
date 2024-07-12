import React, {useContext, useState} from 'react'
import './NavBar.css'
import logoImage from '../Assets/logo.png';
import cart_icon from '../Assets/icons/shopping_cart_20dp_FILL0_wght400_GRAD0_opsz20.png'; 
import add_icon from '../Assets/icons/add_circle_20dp_FILL0_wght400_GRAD0_opsz20(1).png';
import home_icon from '../Assets/icons/home_20dp_FILL0_wght400_GRAD0_opsz20(2).png'; 
import notification_icon from '../Assets/icons/notifications_20dp_FILL0_wght400_GRAD0_opsz20.png';
import logout_icon from '../Assets/icons/logout_20dp_FILL0_wght400_GRAD0_opsz20.png';
import profile_icon from '../Assets/icons/person_20dp_FILL0_wght400_GRAD0_opsz20.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import search_icon from '../Assets/icons8-search-20.png';

const NavBar = () => {

  const [menu, setmenu] = useState("Home")
  const {getTotalCartItems} = useContext(ShopContext)

  return (
    <nav className="navbar">
      <nav className='top'>
      <nav className="search">
        <img src={search_icon} alt="" />
        <input type="text" className = 'search-input' placeholder='Search'/>
      </nav>
      </nav>
      <nav className='sidebar'>
      <nav className='nav-logo'>
      <nav className='logo-img'>
      <img src={logoImage} alt="" />
      </nav>
      <nav className="logo-name">
        <p>Bi3ly</p>
      </nav>
      </nav>
      <nav className='home-button'>
          <Link to = '/'><img src={home_icon} alt="waseet" /></Link>
      </nav>
      <div className="action-buttons">
        <nav className="sell-button">
        <a href ='/AddListing' className='custom-button'><img src={add_icon} alt="" /></a> 
        </nav>
        <nav className="login-button">
          <a href ='/Login' className='custom-button'> <img src={profile_icon} alt="" /></a>
        </nav>
        <nav className='cart-button'>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
          <Link to = '/Cart'><img src={cart_icon} alt="Cart" /></Link>
        </nav>
   
      </div>
      </nav>
      
    </nav>
  );
};

export default NavBar;
