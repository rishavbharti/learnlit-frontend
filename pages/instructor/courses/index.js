import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

import withAuth from 'src/components/HOC/withAuth';

import Button from 'src/components/Button';
import InstructorPageLayout from 'src/components/InstructorPageLayout';
import CourseCard from 'src/components/CourseCard';
import CenterAligned from 'src/components/CenterAligned';
import CreateCourseDialog from 'src/components/CreateCourseDialog';

import { openDialog } from 'redux/slice/dialog';
import { getPostedCourses } from 'redux/slice/course';

import OnlineLearning from 'public/assets/online_learning.svg';

const Courses = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getPostedCourses());
  }, [dispatch]);

  const handleCreateCourseClick = () => {
    dispatch(openDialog());
  };

  const handleCourseClick = (course) =>
    router.push(`/instructor/courses/manage/${course._id}?m=d`);

  const renderCourses = () => {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-10'>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            handleClick={() => handleCourseClick(course)}
            hoverText='Edit / manage course'
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
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
          <p>Some error occurred while fetching courses.</p>
        </CenterAligned>
      );
    }

    if (!courses.length) {
      return (
        <CenterAligned>
          <Image
            src={OnlineLearning}
            alt='OnlineLearning'
            width='600'
            height='350'
          />
          <p className='text-center font-bold text-lg py-10'>
            You have not created any course yet.
            <br /> Start by creating one.
          </p>
        </CenterAligned>
      );
    }

    return renderCourses();
  };

  return (
    <InstructorPageLayout>
      <div className='flex justify-between mb-5'>
        <h1 className='text-2xl font-medium'>Courses</h1>
        <Button
          label='Create Course'
          startIcon={<AddIcon />}
          onClick={handleCreateCourseClick}
        />
      </div>
      {renderContent()}
      <CreateCourseDialog />
    </InstructorPageLayout>
  );
};

export default withAuth(Courses);
