import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import withAuth from 'src/components/HOC/withAuth';
import ManageCourseLayout from 'src/components/ManageCourseLayout';
import { fetchCourse } from 'redux/slice/course';

const EditCourse = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.query.id && dispatch(fetchCourse(router.query.id));
  }, [dispatch, router.query.id]);

  return <ManageCourseLayout />;
};

export default withAuth(EditCourse);
