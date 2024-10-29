import React from 'react';
import '../../Asserts/Styles/Home.css';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className='footer_main'>
        <div className='footer'>
          <div className='footer-links'>
            <p><Link to="/" className='footer_link_style'>Home</Link></p>
            <p><Link to="/about" className='footer_link_style'>About Us</Link></p>
          </div>
          <div className='footer-icons'>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><FaWhatsapp className='footer_link_style' size={25} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className='footer_link_style' size={25} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className='footer_link_style' size={25} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className='footer_link_style' size={25} /></a>
          </div>
          <div >
            <p className='container-fluid pt-3 pb-3 footer_copyright'>
              Copyright &copy;  All rights reserved | E-Learning
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
