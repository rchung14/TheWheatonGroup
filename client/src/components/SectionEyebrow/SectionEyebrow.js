import React from 'react';
import './SectionEyebrow.css';

// Signature design element: a short 2px rule above section headings.
// Replaces the former all-caps gold label (removed for readability and
// WCAG contrast). Children are accepted for backwards compatibility with
// existing call sites but intentionally not rendered.
const SectionEyebrow = () => (
  <div className="eyebrow" aria-hidden="true">
    <span className="eyebrow__rule"></span>
  </div>
);

export default SectionEyebrow;
