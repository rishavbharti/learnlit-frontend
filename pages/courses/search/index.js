import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Layout from 'src/components/Layout';

import { getCategoryCourses } from 'redux/slice/course';

import CourseInfoCard from 'src/components/CourseInfoCard';
import CenterAligned from 'src/components/CenterAligned';

import NoCourses from 'public/assets/void.svg';

export default function Category() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { q } = router.query;

  const { categoryCourses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (q && !categoryCourses?.[q]?.loading && !categoryCourses?.[q]?.courses) {
      dispatch(
        getCategoryCourses({
          stateName: q,
          query: q,
        })
      );
    }
  }, [dispatch, q]);

  const renderContent = () => {
    if (categoryCourses?.[q]) {
      if (!categoryCourses[q]?.courses?.length) {
        return (
          <CenterAligned>
            <Image src={NoCourses} width='250' height='250' alt='No courses' />
            <p className='mt-10 font-medium text-lg'>No courses found</p>
          </CenterAligned>
        );
      }

      return (
        <>
          <p className='my-5 text-2xl font-bold'>
            {categoryCourses[q]?.courses?.length} result
            {categoryCourses[q]?.courses?.length > 1 ? 's' : ''} for &quot;{q}
            &quot;
          </p>
          <div className='flex gap-10'>
            {categoryCourses[q].courses.map((course, i) => (
              <div key={i} className='w-60'>
                <CourseInfoCard course={course} />
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <Layout
      loading={categoryCourses?.[q]?.loading}
      error={categoryCourses?.[q]?.error}
    >
      <div className='px-10 xl:px-0 my-10'>
        <p className='text-2xl font-semibold mb-5'>
          {categoryCourses?.[q] && categoryCourses[q]?.title}
        </p>
        {renderContent()}
      </div>
    </Layout>
  );
}
