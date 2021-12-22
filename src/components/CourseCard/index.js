import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Books from 'public/assets/books.svg';

const CourseCard = (props) => {
  const { course } = props;
  const router = useRouter();

  const handleClick = () =>
    router.push(`/instructor/courses/manage/${course._id}`);

  return (
    <div className='relative'>
      <div className='border border-solid border-border rounded-md cursor-pointer'>
        <Image src={Books} alt='books' width='250' height='130' />
        <div className='px-2 pb-3'>
          <h2>{course.title}</h2>
          <p className='text-labelText'>{course.category}</p>
        </div>
      </div>
      <div
        className='cursor-pointer flex justify-center items-center absolute w-full h-full top-0 backdrop-blur-md opacity-0 hover:opacity-90'
        onClick={handleClick}
      >
        <p>Edit / manage course</p>
      </div>
    </div>
  );
};

export default CourseCard;
