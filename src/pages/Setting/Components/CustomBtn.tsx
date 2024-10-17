import React from 'react';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  disabled?:boolean;
}


const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick ,disabled}) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`rounded-md border px-4 py-2 text-sm transition duration-200 my-5
            ${disabled ? 'border-gray-400 bg-gray-200 text-gray-400 cursor-not-allowed' : 'border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]'}`}
        >
        {label}
      </button>
    );
  };

export default CustomButton
