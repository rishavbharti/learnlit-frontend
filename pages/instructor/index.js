import { useEffect } from 'react';
import { useRouter } from 'next/router';

import withAuth from 'src/components/HOC/withAuth';

const Instructor = () => {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: '/instructor/courses' });
  }, [router]);

  return null;
};

export default withAuth(Instructor);
