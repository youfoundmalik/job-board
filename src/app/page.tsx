import { Input, Select } from "@/components/common";
import Header from "@/components/layout/Header";
import { JobsTable } from "@/components/tables";
import { jobTypes } from "@/lib/constants";

export default function Home() {
  return (
    <div className='w-full 3xl:max-w-[1400px] py-10 px-[min(150px,8%)] bg-white mx-auto min-h-screen flex flex-col gap-4'>
      <Header />
      <div className='flex flex-col gap-6 mx-8 flex-grow'>
        <h2 className='text-3xl font-bold text-foreground'>Job Board</h2>
        <div className='flex items-center gap-6'>
          <Input containerClass='w-[218px]' className='placeholder:text-foreground text-sm' placeholder='Location' />
          <Select options={jobTypes} containerClass='w-[218px]' placeholder='Job Type' />
          <Input containerClass='w-[218px]' className='placeholder:text-foreground text-sm' placeholder='Skills' />
        </div>
        <JobsTable />
      </div>
    </div>
  );
}
