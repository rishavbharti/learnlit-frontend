import React from 'react';
import { useRouter } from 'next/router';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Button from 'src/components/Button';

const ManageCourseLayout = () => {
  const router = useRouter();

  const activePath = router.query.m;

  const menu = [
    {
      icon: InfoOutlinedIcon,
      label: 'Course Details',
      query: 'd',
    },
    {
      icon: TocOutlinedIcon,
      label: 'Curriculum',
      query: 'c',
    },
    {
      icon: MonetizationOnOutlinedIcon,
      label: 'Pricing',
      query: 'p',
    },
    {
      icon: SettingsOutlinedIcon,
      label: 'Settings',
      query: 's',
    },
  ];

  const handleMenuClick = (query) => {
    router.push({
      pathname: `/instructor/courses/manage/${router.query.id}`,
      query: { m: query },
    });
  };

  return (
    <div>
      <div className='bg-black text-white h-14 px-16 md:px-40 flex justify-between items-center'>
        <h2 className='text-lg font-bold'>Title</h2>
        <Button
          label='Save'
          onClick={() => {}}
          variant='contained'
          className='bg-primary'
        />
      </div>
      <div className='flex flex-col lg:flex-row gap-5 px-3 lg:px-16 lg:py-5'>
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:w-1/6 lg:flex lg:flex-col justify-between gap-3 mt-5 lg:mt-14'>
          {menu.map((item, index) => (
            <div
              key={index}
              className={`flex gap-3 cursor-pointer p-2 hover:bg-hoverBg ${
                activePath === item.query && 'bg-hoverBg'
              }`}
              onClick={() => handleMenuClick(item.query)}
            >
              <item.icon />
              {item.label}
            </div>
          ))}
        </div>
        <div className='p-10 shadow-lg w-full'>Body</div>
      </div>
    </div>
  );
};

export default ManageCourseLayout;
