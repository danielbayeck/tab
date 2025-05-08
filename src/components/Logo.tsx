import React from 'react';
import { Users } from 'lucide-react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Users size={size} className="text-red-600" />
      {showText && (
        <span className="font-bold text-lg">Le Coequipier</span>
      )}
    </div>
  );
};

export default Logo;