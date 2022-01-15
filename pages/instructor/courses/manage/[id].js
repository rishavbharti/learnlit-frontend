import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import withAuth from 'src/components/HOC/withAuth';
import ManageCourse from 'src/components/ManageCourse';
import { fetchCourse } from 'redux/slice/course';

const EditCourse = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.query.id && dispatch(fetchCourse({ id: router.query.id }));
  }, [dispatch, router.query.id]);

  return <ManageCourse />;
};

export default withAuth(EditCourse);
