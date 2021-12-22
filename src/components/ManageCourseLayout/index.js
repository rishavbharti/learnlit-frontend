import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Button from 'src/components/Button';
import CenterAligned from '../CenterAligned/index.js';
import CourseCurriculum from '../CreateCourseCurriculum/index.js';

const ManageCourseLayout = () => {
  const router = useRouter();
  const { loading, error, data } = useSelector((state) => state.courses.course);

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

  const renderBody = () => {
    if (loading) {
      return (
        <CenterAligned>
          <CircularProgress />
        </CenterAligned>
      );
    }

    if (error) {
      return (
        <CenterAligned>
          <p>Some error occurred while fetching course details.</p>
        </CenterAligned>
      );
    }

    switch (activePath) {
      case 'c':
        return <CourseCurriculum />;

      default:
        return null;
    }
  };

  return (
    <div>
      <div className='bg-black text-white h-14 px-16 md:px-40 flex justify-between items-center'>
        <h2 className='text-lg font-bold'>{data?.title}</h2>
        <Button
          label='Save'
          onClick={() => {}}
          variant='contained'
          className='bg-primary'
        />
      </div>
      <div className='flex flex-col lg:flex-row gap-5 px-3 lg:px-12 lg:py-5'>
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:w-1/6 lg:flex lg:flex-col justify-between gap-3 mt-5 lg:mt-14 h-max'>
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
        <div className='p-3 lg:p-5 shadow-lg w-full'>{renderBody()}</div>
      </div>
    </div>
  );
};

export default ManageCourseLayout;
