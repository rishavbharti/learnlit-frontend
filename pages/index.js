import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'src/components/Layout';

import { getAllCourses } from 'redux/slice/course';

import CourseCarousel from 'src/components/CourseCarousel';

import BannerImg from 'public/assets/banner.png';

export default function Home() {
  const dispatch = useDispatch();

  const { loading, error, data } = useSelector(
    (state) => state.courses.allcourses
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <Layout loading={loading} error={error}>
      <Image src={BannerImg} width={1340} height={460} alt='banner' />
      <div className='px-10 xl:px-0 my-10'>
        <CourseCarousel data={data} />
      </div>
    </Layout>
  );
}
