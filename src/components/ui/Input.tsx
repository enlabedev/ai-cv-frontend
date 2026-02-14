import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, ...props }) => (
  <div className="relative w-full">
    {icon && (
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
    )}
    <input 
      {...props} 
      className={`w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-blue transition-all outline-none ${props.className || ''}`}
    />
  </div>
);