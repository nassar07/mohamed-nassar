import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 200 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="text-primary" style={{ stopColor: 'currentColor' }} />
          <stop offset="100%" className="text-primary-glow" style={{ stopColor: 'currentColor' }} />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="35"
        fontFamily="Poppins, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="url(#logoGradient)"
        letterSpacing="2"
      >
        MN
      </text>
    </svg>
  );
};
