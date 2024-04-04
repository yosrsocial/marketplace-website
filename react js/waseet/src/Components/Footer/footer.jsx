import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import instagram_icon from '../Assets/icons8-instagram-30.png'
import twitterx_icon from '../Assets/icons8-twitterx-30.png'
import tiktok_icon from '../Assets/icons8-tiktok-30.png'
import facebook_icon from '../Assets/icons8-facebook-30.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src= {logo} alt="" />
            <p>Bi3ly</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={facebook_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={tiktok_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={twitterx_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer;
