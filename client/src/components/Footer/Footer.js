import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer>
            <p>&copy; {new Date().getFullYear()} The Wheaton Group, LLC</p>
            <p>Contact us at <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a></p>
    </footer>
);

export default Footer;