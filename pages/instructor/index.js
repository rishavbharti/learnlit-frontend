import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Instructor = () => {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: '/instructor/courses' });
  }, [router]);

  return null;
};

export default Instructor;
