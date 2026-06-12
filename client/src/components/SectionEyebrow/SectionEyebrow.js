import React from 'react';
import './SectionEyebrow.css';

// Signature design element: gold eyebrow label + 40px × 2px gold rule.
// Place above every section heading (DESIGN.md → Signature Design Element).
const SectionEyebrow = ({ children }) => (
  <div className="eyebrow">
    <span className="eyebrow__label">{children}</span>
    <span className="eyebrow__rule" aria-hidden="true"></span>
  </div>
);

export default SectionEyebrow;
