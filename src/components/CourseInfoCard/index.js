import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Books from 'public/assets/books.svg';
import CourseInfoPopover from '../CourseInfoPopover';

const CourseInfoCard = (props) => {
  const router = useRouter();
  const { course } = props;

  const handleClick = () => router.push(`/course/${course.slug}`);

  return (
    <CourseInfoPopover course={course}>
      <div onClick={handleClick} className='cursor-pointer'>
        <Image src={Books} alt='books' width='300' height='170' />
        <div className='text-base pb-3'>
          <h2>{course.title}</h2>
          <p className='text-labelText text-sm'>
            {course?.instructors.map((i) => i.name).join(', ')}
          </p>
          <p className='font-medium'>
            {course?.pricing === 'Free'
              ? 'Free'
              : `${course.currency} ${course.price}`}
          </p>
        </div>
      </div>
    </CourseInfoPopover>
  );
};

export default CourseInfoCard;
