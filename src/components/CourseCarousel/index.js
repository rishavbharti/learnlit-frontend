import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import CourseInfoCard from '../CourseInfoCard';

const CourseCarousel = (props) => {
  const { data } = props;

  const renderSlides = () => {
    return data?.map((course, index) => (
      <SwiperSlide key={index}>
        <CourseInfoCard course={course} />
      </SwiperSlide>
    ));
  };

  return (
    <>
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
    </>
  );
};

export default CourseCarousel;
