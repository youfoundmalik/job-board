import React from "react";
import TableBase, { TableCell, TableHeaderCell } from "./base";

const JobsTable = () => {
  return (
    <TableBase className='border-separate border-spacing-1/2'>
      <thead>
        <tr className='rounded-lg !overflow-clip'>
          <TableHeaderCell>Job Title</TableHeaderCell>
          <TableHeaderCell>Job Type</TableHeaderCell>
          <TableHeaderCell>Skills</TableHeaderCell>
          <TableHeaderCell>Languages</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
        </tr>
      </thead>
      <tbody className='before:content-[" "] before:block before:h-2'>
        <tr>
          <TableCell className='!px-0 min-w-[270px]'>
            <div className='px-2.5 py-2 rounded-lg bg-base-gray-300 box-border flex items-start gap-2.5'>
              <div className='w-9.5 h-9.5 rounded-full bg-white'></div>
              <div className='flex flex-col gap-1'>
                <p className='text-base-black font-medium text-sm md:text-base line-clamp-1'>Jr. Frontend Engineer</p>
                <span className='text-xs text-base-gray-800'>Spotify, Singapore - 2 Days ago</span>
              </div>
            </div>
          </TableCell>
          <TableCell>Remote</TableCell>
          <TableCell>React,Node js</TableCell>
          <TableCell>English, Spanish</TableCell>
          <TableCell>Frontend</TableCell>
        </tr>
      </tbody>
    </TableBase>
  );
};

export default JobsTable;
