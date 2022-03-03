import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import CircularProgress from '@mui/material/CircularProgress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CenterAligned from '../CenterAligned';
import CreateCurriculum from './CreateCurriculum';
import CourseDetails from './CourseDetails';
import IntendedLearners from './IntendedLearners';
import Pricing from './Pricing';
import Settings from './Settings';

const ManageCourse = () => {
  const router = useRouter();
  const [isPristine, setIsPristine] = useState(true);

  const {
    fetch: { loading, error },
    data,
  } = useSelector((state) => state.courses.course);

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
      icon: PeopleOutlinedIcon,
      label: 'Intended learners',
      query: 'l',
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
    if (!isPristine) {
      const consent = confirm(
        'You have unsaved changes. Do you really wish to continue without saving?'
      );

      if (consent) {
        router.push({
          pathname: `/instructor/courses/manage/${router.query.id}`,
          query: { m: query },
        });
        setIsPristine(true);
      } else {
        return;
      }
    } else {
      router.push({
        pathname: `/instructor/courses/manage/${router.query.id}`,
        query: { m: query },
      });
    }
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
      case 'd':
        return <CourseDetails setIsPristine={setIsPristine} />;
      case 'c':
        return <CreateCurriculum />;
      case 'l':
        return <IntendedLearners />;
      case 'p':
        return <Pricing setIsPristine={setIsPristine} />;
      case 's':
        return <Settings setIsPristine={setIsPristine} />;
      default:
        return <CourseDetails setIsPristine={setIsPristine} />;
    }
  };

  return (
    <div>
      <div className='bg-black text-white h-14 px-16 md:px-40 flex justify-between items-center'>
        <div className='flex items-center gap-24'>
          <Link href='/instructor/courses'>
            <a>
              <ArrowBackIcon className='cursor-ponter' />
            </a>
          </Link>
          <h2 className='text-lg font-bold'>{data?.title}</h2>
        </div>
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

export default ManageCourse;
