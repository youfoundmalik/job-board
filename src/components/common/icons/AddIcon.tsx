import { SVGProps } from "react";

const AddIcon: React.FC<SVGProps<SVGSVGElement>> = ({ fill = "white", ...props }) => {
  return (
    <svg width='23' height='22' viewBox='0 0 23 22' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11.6744 7V15M7.67444 11H15.6744M21.6744 11C21.6744 16.5228 17.1973 21 11.6744 21C6.15159 21 1.67444 16.5228 1.67444 11C1.67444 5.47715 6.15159 1 11.6744 1C17.1973 1 21.6744 5.47715 21.6744 11Z'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default AddIcon;
