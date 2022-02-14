import React, { useState, useEffect } from 'react';
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
  const { category } = router.query;
  console.log(category);

  const [stateName, setStateName] = useState();

  const { loading, error, data } = useSelector(
    (state) => state.courses.categoryCourses
  );

  useEffect(() => {
    setStateName(category?.[1] || category?.[0]);

    if (!loading && category && !data?.[stateName]) {
      dispatch(
        getCategoryCourses({
          stateName: category?.[1] || category?.[0],
          category: category[0],
          subCategory: category?.[1],
        })
      );
    }
  }, [dispatch, category, stateName]);

  const renderContent = () => {
    if (data?.[stateName]) {
      if (!data?.[stateName]?.courses.length) {
        return (
          <CenterAligned>
            <Image src={NoCourses} width='250' height='250' alt='No courses' />
            <p className='mt-10 font-medium text-lg'>No courses found</p>
          </CenterAligned>
        );
      }

      return (
        <div className='flex gap-10'>
          {data?.[stateName]?.courses.map((course, i) => (
            <div key={i} className='w-60'>
              <CourseInfoCard course={course} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Layout loading={loading} error={error}>
      <div className='px-10 xl:px-0 my-10'>
        <p className='text-2xl font-semibold mb-5'>
          {data?.[stateName] && data[stateName]?.title}
        </p>
        {renderContent()}
      </div>
    </Layout>
  );
}
