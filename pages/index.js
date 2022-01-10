import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'src/components/Layout';

import { getAllCourses } from 'redux/slice/course';

import BannerImg from 'public/assets/banner.png';
import CourseCard from 'src/components/CourseCard';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, data } = useSelector(
    (state) => state.courses.allcourses
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <Layout loading={loading} error={error}>
      <Image src={BannerImg} width={1340} height={460} alt='banner' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-10'>
        {data.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            handleClick={() => router.push(`/course/${course.slug}`)}
            hoverText='Preview course'
          />
        ))}
      </div>
    </Layout>
  );
}
