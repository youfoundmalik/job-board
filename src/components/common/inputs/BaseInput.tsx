import { InputHTMLAttributes, ReactNode } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  containerClass?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({ icon, containerClass = "", className = "", ...props }) => {
  return (
    <div
      className={`relative h-11 flex items-center justify-center gap-2 rounded-lg px-4 bg-base-gray-400 border-2 border-transparent focus-within:border-gray-400 transition-all duration-100 ${containerClass}`}
    >
      {icon}
      <input {...props} className={`w-full outline-none ring-none text-base-black ${className}`} />
    </div>
  );
};

export default BaseInput;
