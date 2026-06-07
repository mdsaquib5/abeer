import React from 'react';
;

export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={`sct-container ${className}`}>
      {subtitle && <span className="sct-subtitle">{subtitle}</span>}
      <h2 className="sct-title">
        <span className="sct-ornament">❀</span>
        <span className="sct-text">{title}</span>
        <span className="sct-ornament">❀</span>
      </h2>
      <div className="sct-divider">
        <span className="sct-line"></span>
        <span className="sct-dot">❀</span>
        <span className="sct-line"></span>
      </div>
    </div>
  );
}
