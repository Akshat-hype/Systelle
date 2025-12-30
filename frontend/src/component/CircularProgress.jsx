import React from 'react';

export function CircularProgress({ value = 0, size = 300, strokeWidth = 20 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  // Calculate knob position angle in radians; value=0 => top (270°)
  const angle = (value / 100) * 2 * Math.PI - Math.PI / 2;
  const knobX = size / 2 + radius * Math.cos(angle);
  const knobY = size / 2 + radius * Math.sin(angle);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Trail */}
      <circle
        stroke="#e5d4f9"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress Path */}
      <circle
        stroke="#7c3aed"
        fill="transparent"
        strokeWidth={strokeWidth-8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
      />
      {/* Knob */}
      
    </svg>
  );
}
