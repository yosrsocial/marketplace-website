import React, {useContext, useState} from 'react'
import './NavBar.css'
import logoImage from '../Assets/logo.png';
import heart_icon from '../Assets/icons/icons8-heart-30.png'; 
import add_icon from '../Assets/icons/icons8-add-30.png';
import home_icon from '../Assets/icons/icons8-home-30.png'; 
import profile_icon from '../Assets/icons/icons8-male-user-30.png';
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
      <div className="action-buttons">
      <nav className='home-button'>
          <Link to = '/'><img src={home_icon} alt="waseet" /></Link>
      </nav>
        <nav className="sell-button">
        <a href ='/AddListing' className='custom-button'><img src={add_icon} alt="" /></a> 
        </nav>
        <nav className="login-button">
          <a href ='/Login' className='custom-button'> <img src={profile_icon} alt="" /></a>
        </nav>
        <nav className='cart-button'>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
          <Link to = '/Favorites'><img src={heart_icon} alt="Favorites" /></Link>
        </nav>
   
      </div>
      </nav>
      
    </nav>
  );
};

export default NavBar;
