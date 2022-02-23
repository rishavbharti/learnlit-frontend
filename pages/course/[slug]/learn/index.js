import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import CurriculumAccordion from 'src/components/Curriculum/CurriculumAccordion';
import CourseNavbar from 'src/components/CourseNavbar';

import { fetchCourse } from 'redux/slice/course';
import VideoPlayer from 'src/components/VideoPlayer';
import CenterAligned from 'src/components/CenterAligned';
import { CircularProgress } from '@mui/material';

const CourseLearningPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);
  const [chapterItem, setChapterItem] = useState();
  const { isAuthenticated, profile } = useSelector((state) => state.auth);
  const {
    fetch: { loading, error, success },
    data: course,
  } = useSelector((state) => state.courses.course);

  const { slug } = router.query;

  useEffect(() => {
    if (!slug) router.push('/');
  }, []);

  useEffect(() => {
    if (isAuthenticated && slug && course?.slug !== slug) {
      dispatch(fetchCourse({ slug }));
    } else if (!isAuthenticated && slug) {
      router.push(`/course/${slug}`);
    }
  }, [dispatch, isAuthenticated, slug, course?.slug]);

  useEffect(() => {
    if (
      course?._id &&
      !profile?.enrolledCourses.some((c) => c.course === course._id) &&
      slug
    ) {
      router.push(`/course/${slug}`);
    }
  }, [dispatch, profile?.enrolledCourses, course?._id]);

  useEffect(() => {
    if (success && !chapterItem) {
      setChapterItem(course.curriculum?.[0].content?.[0]);
    }
  }, [course?.curriculum, success, chapterItem]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleItemClick = (lecture) => {
    setChapterItem(lecture);
  };

  const renderHeading = () => {
    return (
      <div className='flex justify-between items-center p-1 px-4'>
        <p className='font-semibold'>Content</p>
        <IconButton aria-label='close' onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  };

  const renderMainContent = () => {
    if (chapterItem?.class === 'Lecture')
      return <VideoPlayer url={chapterItem?.embedUrl} />;

    return (
      <CenterAligned height='screen'>
        <div
          dangerouslySetInnerHTML={{
            __html: chapterItem?.embedUrl,
          }}
        />
      </CenterAligned>
    );
  };

  const renderPage = () => {
    return (
      <div className='flex text-base h-auto overflow-auto overscroll-auto'>
        <div
          className={classnames({
            'w-full lg:w-3/5': showSidebar,
            'w-full': !showSidebar,
          })}
        >
          <div className='relative'>
            {renderMainContent()}
            {!showSidebar && (
              <IconButton
                size='large'
                color='inherit'
                aria-label='back'
                onClick={toggleSidebar}
                className='absolute top-2 right-2 z-50 bg-bodyBg hover:bg-bodyBg drop-shadow-md'
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            )}
          </div>
          <div
            className={classnames('mx-5 md:mx-16 lg:mx-40 mt-5 md:mt-10', {
              'lg:hidden': showSidebar,
            })}
          >
            <CurriculumAccordion
              handleItemClick={handleItemClick}
              activeChapterItem={chapterItem}
            />
          </div>
        </div>
        {showSidebar && (
          <div className='hidden lg:block lg:w-1/4 lg:sticky lg:top-0'>
            {renderHeading()}
            <div
              className='overflow-auto overscroll-auto'
              style={{ height: '600px' }}
            >
              <CurriculumAccordion
                handleItemClick={handleItemClick}
                activeChapterItem={chapterItem}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <CenterAligned height='screen'>
          <CircularProgress />
        </CenterAligned>
      );
    }

    if (error) {
      return (
        <CenterAligned height='screen'>
          <h3>Error fetching course</h3>
        </CenterAligned>
      );
    }

    return (
      <div>
        <CourseNavbar title={course?.title} slug={course?.slug} />
        {renderPage()}
      </div>
    );
  };

  return renderContent();
};

export default CourseLearningPage;
