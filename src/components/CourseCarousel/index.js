import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import CourseInfoCard from '../CourseInfoCard';
import ShimmerBlock from '../ShimmerBlock';

const CourseCarousel = (props) => {
  const { data, title, loading } = props;

  const renderSlides = () => {
    if (loading) {
      return new Array(5).fill(1).map((item, id) => (
        <SwiperSlide key={id}>
          <ShimmerBlock className='w-full h-36' />
        </SwiperSlide>
      ));
    }

    return data?.map((course, index) => (
      <SwiperSlide key={index}>
        <CourseInfoCard course={course} />
      </SwiperSlide>
    ));
  };

  const renderTitle = () => {
    if (title) {
      if (loading) {
        return <ShimmerBlock className='w-72 h-6 rounded' />;
      }

      return <p className='text-2xl font-semibold'>{`${title} Courses`}</p>;
    }
  };

  const renderSwiper = () => {
    return (
      <div className='my-8'>
        <div className='mb-3'>{renderTitle()}</div>
        <Swiper
          breakpoints={{
            // when window width is >= 600px
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            980: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className='mySwiper'
        >
          {renderSlides()}
        </Swiper>
      </div>
    );
  };

  const renderContent = () => {
    if (loading || data?.length) {
      return renderSwiper();
    }

    if (!loading && !data?.length) {
      return null;
    }
  };

  return renderContent();
};

export default CourseCarousel;
