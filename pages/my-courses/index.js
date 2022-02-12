import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'src/components/Layout';
import CenterAligned from 'src/components/CenterAligned';

import { getEnrolledCourses } from 'redux/slice/auth';

import OnlineLearning from 'public/assets/online_learning.svg';
import CourseInfoCard from 'src/components/CourseInfoCard';

export default function MyCourses() {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    profile,
    getEnrolledCourses: { loading, error },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      dispatch(getEnrolledCourses());
    }
  }, [dispatch]);

  const renderCourses = () => {
    if (!isAuthenticated || !profile?.enrolledCoursesData?.length) {
      return (
        <CenterAligned>
          <Image
            src={OnlineLearning}
            width='250'
            height='250'
            alt='My courses'
          />
          <p className='text-labelText mt-5'>
            Your haven&apos;t enrolled in any course yet.
          </p>
        </CenterAligned>
      );
    }

    return (
      <div className='flex gap-5'>
        {profile?.enrolledCoursesData.map((c, i) => (
          <div key={i} className='w-60'>
            <CourseInfoCard course={c.course} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout loading={loading} error={error}>
      <div className='px-10 xl:px-0 my-10'>
        <h1 className='text-2xl font-semibold mb-5'>My Courses</h1>
        {renderCourses()}
      </div>
    </Layout>
  );
}
