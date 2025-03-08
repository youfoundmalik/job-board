import Image from "next/image";
import React, { ReactNode } from "react";

import img from "../../../public/images/no-data.svg";

const NoData: React.FC<{ title?: string; subText?: ReactNode }> = ({ title = "No data found", subText }) => {
  return (
    <div className='flex-grow flex items-center justify-start flex-col gap-2'>
      <Image src={img} alt='No data' width={100} height={100} className='w-[350px]' />
      <h4 className='text-base-black font-semibold text-xl md:text-2xl'>{title}</h4>
      {subText && <p className='text-base-gray-800 text-sm text-center'>{subText}</p>}
    </div>
  );
};

export default NoData;
