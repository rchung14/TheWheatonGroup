import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

// Renders a router Link when `to` is given, an anchor when `href` is given,
// otherwise a plain <button>. Variants: primary | ghost | light | gold.
const Button = ({ to, href, variant = 'primary', pill = false, className = '', children, ...rest }) => {
  const cls = `btn btn--${variant}${pill ? ' btn--pill' : ''}${className ? ` ${className}` : ''}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
