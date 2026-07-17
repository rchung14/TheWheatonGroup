import React from 'react';
import './SectionEyebrow.css';

// Section eyebrow: short uppercase, tracked label above H1/H2 headings.
// Color is context-aware via CSS - accent on light section backgrounds,
// translucent white on navy/dark sections (page hero, CTA banner, stats).
// Renders nothing if no label is passed, so it's safe to omit on sections
// that don't need one.
const SectionEyebrow = ({ children }) => {
  if (!children) return null;
  return <span className="eyebrow">{children}</span>;
};

export default SectionEyebrow;
