import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, children, className, ...props }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-red-300 transition-all duration-200 text-left ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;