import React, { SelectHTMLAttributes } from "react";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClass?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ options, className = "", containerClass = "", placeholder = "Select an option", ...props }) => {
  return (
    <div
      className={`relative h-11 flex items-center rounded-lg px-4 bg-base-gray-400 border-2 border-transparent cursor-pointer focus-within:border-gray-400 transition-all duration-100 ${containerClass}`}
    >
      <select {...props} className={`w-full h-full cursor-pointer outline-none ring-none text-sm text-base-black ${className}`}>
        <option disabled selected className='pointer-events-none opacity-50'>
          {placeholder}
        </option>
        {options.map((option) => (
          <option className='cursor-pointer !font-inter' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
