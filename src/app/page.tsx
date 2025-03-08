import { Input, Select } from "@/components/common";
import Header from "@/components/layout/Header";
import { JobsTable } from "@/components/tables";
import { jobTypes } from "@/lib/constants";

export default function Home() {
  return (
    <div className='w-full 3xl:max-w-[1400px] py-5 md:py-10 px-[min(150px,5%)] bg-white mx-auto min-h-screen h-full flex flex-col gap-4'>
      <Header />
      <div className='flex flex-col gap-6 md:mx-8 flex-grow'>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground'>Job Board</h2>
        <div className='flex items-center gap-2 md:gap-6 flex-col md:flex-row'>
          <Input containerClass='w-full md:w-[218px]' className='placeholder:text-foreground text-sm' placeholder='Location' />
          <Select options={jobTypes} containerClass='w-full md:w-[218px]' placeholder='Job Type' />
          <Input containerClass='w-full md:w-[218px]' className='placeholder:text-foreground text-sm' placeholder='Skills' />
        </div>
        <JobsTable />
      </div>
    </div>
  );
}
