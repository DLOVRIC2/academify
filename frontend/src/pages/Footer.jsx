import React from 'react';
import { Facebook, GitHub, Youtube, Linkedin, Instagram, Twitter } from 'react-feather';
import './style/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <h5 className='fw-light text-center p-3'>Stay connected</h5>
      <div className="container text-center">
        <div className="social-icons">
          <a href="#"><Facebook className='icon' size={45} /></a>
          <a href="#"><Twitter className='icon' size={45} /></a>
          <a href="#"><Instagram className='icon' size={45} /></a>
          <a href="#"><Linkedin className='icon' size={45} /></a>
          <a href="#"><Youtube className='icon' size={45} /></a>
          <a href="#"><GitHub className='icon' size={45} /></a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Academify. All Rights Reserved.</p>
        <div className="contact-pricing-row">
          <a href="#" className="contact-link me-2">Privacy Policy</a>
          <span className="divider"></span>
          <a href="#" className="contact-link me-2">Contact</a>
          <span className="divider"></span>
          <a href="#" className="pricing-link">Pricing</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
