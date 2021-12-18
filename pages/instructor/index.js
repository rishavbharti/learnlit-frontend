import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorProfile } from 'redux/slice/instructor';

const Instructor = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth);
  const { loading, profile: instructorProfile } = useSelector(
    (state) => state.instructor
  );

  useEffect(() => {
    router.push({ pathname: '/instructor/courses' });
  }, [router]);

  useEffect(() => {
    if (
      profile?.role.includes('Instructor') &&
      !loading &&
      !instructorProfile
    ) {
      dispatch(getInstructorProfile(profile?.instructorProfile[0]));
    }
  }, [dispatch, loading, profile, instructorProfile]);

  return null;
};

export default Instructor;
