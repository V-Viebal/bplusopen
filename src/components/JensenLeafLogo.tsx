import React from 'react';

interface JensenLeafLogoProps {
  className?: string;
  hasShadow?: boolean;
}

export const JensenLeafLogo: React.FC<JensenLeafLogoProps> = ({ 
  className = "w-16 h-16", 
  hasShadow = true 
}) => (
  <svg 
    viewBox="0 0 100 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g filter={hasShadow ? "drop-shadow(0 4px 10px rgba(0,0,0,0.35))" : undefined}>
      {/* Central Flame / Leaf */}
      <path 
        d="M50 8C50 8 43 32 43 54C43 72 46 84 50 94C54 84 57 72 57 54C57 32 50 8 50 8Z" 
        fill="currentColor" 
      />
      {/* Left curving petal */}
      <path 
        d="M50 18C44 26 31 46 31 66C31 82 40 98 48 106C42 98 37 84 37 68C37 50 47 30 50 18Z" 
        fill="currentColor" 
      />
      {/* Right curving petal */}
      <path 
        d="M50 18C56 26 69 46 69 66C69 82 60 98 52 106C58 98 63 84 63 68C63 50 53 30 50 18Z" 
        fill="currentColor" 
      />
      {/* Lower curl accents */}
      <path 
        d="M50 62C46 72 44 86 50 108C44 94 45 80 50 62Z" 
        fill="currentColor" 
      />
    </g>
  </svg>
);
