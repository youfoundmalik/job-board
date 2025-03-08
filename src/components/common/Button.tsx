import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

const Button = ({ children, icon, className = "", ...props }: ButtonProps) => {
  return (
    <button {...props} className={`flex items-center justify-center gap-3 cursor-pointer rounded-lg text-sm font-bold h-12 px-3 ${className}`}>
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
