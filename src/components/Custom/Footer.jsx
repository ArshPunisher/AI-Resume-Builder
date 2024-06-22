import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg mb-4">Logo</h3>
          <p className="text-sm">
            The proper Footer on proper time can preserve you protection. We assist you make sure everybody forward.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/arsh-ramgarhia/" target='blank'  className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://x.com/ArshRamgarhia" target='blank' className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/iarshramgarhia/" target='blank' className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Quick Link</h3>
          <ul className='space-y-3'>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="#" className="text-gray-400 hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="#" className="text-gray-400 hover:text-white">Services</Link>
            </li>

          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Company</h3>
          <ul className='space-y-4'>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms Of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Contact</h3>
          <ul>
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              44 Jandiala Guru, Amritsar City, Panjab
            </li>
            <li className="flex items-center mt-2">
              <i className="fas fa-envelope text-gray-400 mr-2"></i>
              arshsiddle0822@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600 mt-8">
        © 2024 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
