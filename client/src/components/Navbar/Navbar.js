import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    // State to manage menu visibility
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <span className="logo"><a href="/">The Wheaton Group, LLC</a></span>
            <button 
                className="menu-toggle" 
                aria-label="Toggle navigation" 
                onClick={toggleMenu}
            >
                ☰
            </button>
            <ul className={`navicons ${menuOpen ? 'show' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contactus">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
