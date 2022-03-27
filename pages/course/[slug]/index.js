import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LanguageIcon from '@mui/icons-material/Language';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

import Layout from 'src/components/Layout';
import CurriculumAccordion from 'src/components/Curriculum/CurriculumAccordion';
import VideoPlayer from 'src/components/VideoPlayer';

import Highlights from 'src/components/CourseLandingPageComps/Highlights';
import Points from 'src/components/CourseLandingPageComps/Points';
import Description from 'src/components/CourseLandingPageComps/Description';
import Instructors from 'src/components/CourseLandingPageComps/Instructors';

import { fetchCourse } from 'redux/slice/course';
import { getCourseDuration, getInstructors } from 'src/utils';
import CourseCTA from 'src/components/CourseCTA';
import Reviews from 'src/components/Reviews';
import Meta from 'src/components/Meta';

const CourseLandingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    fetch: { loading, error },
    data: course,
  } = useSelector((state) => state.courses.course);

  const { slug } = router.query;

  useEffect(() => {
    if (slug && course?.slug !== slug) {
      dispatch(fetchCourse({ slug }));
    }
  }, [dispatch, slug, course?.slug]);

  const renderHeader = () => {
    return (
      <div className='pt-8 pb-12 bg-headerBg text-secondaryText lg:h-80'>
        <div className='flex justify-between w-11/12 xl:w-18/25 mx-auto'>
          <div className='w-11/12 md:w-3/4 lg:w-61/100 mx-auto lg:m-0'>
            <p className='flex items-center text-sm text-primaryLight my-3'>
              {course?.category}{' '}
              <NavigateNextIcon
                fontSize='small'
                className='text-secondaryText'
              />
              {course?.subCategory}
            </p>
            <div className='block lg:hidden'>
              <VideoPlayer url={course?.previewMedia} />
            </div>
            <div className='flex flex-col gap-2 my-5'>
              <h1 className='text-3xl font-medium'>{course?.title}</h1>
              <h1 className='text-lg'>{course?.subtitle}</h1>
            </div>
            <div className='flex gap-3 text-sm divide-x divide-solid'>
              <p>
                Course Creator:{' '}
                <span className='font-bold'>{getInstructors(course)}</span>
              </p>
              <p className='pl-3 flex items-center gap-2'>
                <LanguageIcon fontSize='small' /> {course?.language}
              </p>
            </div>
            <div className='mt-8 block lg:hidden'>
              <CourseCTA course={course} />
            </div>
          </div>
          {renderSidebar()}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className='hidden lg:block w-96 text-mainText'>
        <VideoPlayer url={course?.previewMedia} />
        <div className='py-8 px-6 bg-bodyBg shadow-md'>
          <CourseCTA course={course} />
          <div>
            <p className='font-bold mt-8 mb-3'>This course includes:</p>
            <div className='flex flex-col gap-3 text-sm'>
              <p className='flex items-center gap-3'>
                <OndemandVideoIcon fontSize='small' />
                {getCourseDuration(course?.duration)} on-demand video
              </p>
              <p className='flex items-center gap-3'>
                <AllInclusiveIcon fontSize='small' />
                Full lifetime access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourseContent = () => {
    return (
      <div>
        <h3 className='font-bold text-2xl mb-4'>Course curriculum</h3>
        <p className='mb-3 text-sm'>
          {course?.curriculum.length} chapters &#8226; {course?.duration} total
          duration
        </p>
        <CurriculumAccordion viewOnly />
      </div>
    );
  };

  return (
    <>
      <Meta title={course?.title} description={course?.subtitle} />
      <Layout loading={loading || !course} error={error} containerClass='px-0'>
        {renderHeader()}
        <div className='flex justify-between py-10 w-11/12 xl:w-18/25 mx-auto'>
          <div className='flex flex-col gap-14 w-11/12 md:w-3/4 lg:w-61/100 mx-auto lg:m-0'>
            <Highlights highlights={course?.highlights} />
            {renderCourseContent()}
            <Points data={course?.prerequisites} title='Requirements' />
            <Description description={course?.description} />
            <Points
              data={course?.targetAudience}
              title='Who this course is for:'
            />
            <Instructors data={course?.instructors} />
            <Reviews
              url={`http://localhost:3000/course/${slug}`}
              id={course?.id}
              title={slug}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CourseLandingPage;
