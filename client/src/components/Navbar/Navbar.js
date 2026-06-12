import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    // State to manage menu visibility
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close the mobile menu after navigating
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <span className="logo"><Link to="/" onClick={closeMenu}>The Wheaton Group, LLC</Link></span>
            <button
                className="menu-toggle"
                aria-label="Toggle navigation"
                onClick={toggleMenu}
            >
                ☰
            </button>
            <ul className={`navicons ${menuOpen ? 'show' : ''}`}>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
                <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
                <li><Link to="/employers" onClick={closeMenu}>Employers</Link></li>
                <li><Link to="/careers" onClick={closeMenu}>Careers</Link></li>
                <li><Link to="/contactus" onClick={closeMenu}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
