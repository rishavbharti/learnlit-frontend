import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import Books from 'public/assets/books.svg';
import { getCourseDuration, getInstructors, getCoursePrice } from 'src/utils';
import { removeFromCart } from 'redux/slice/auth';

const CartCard = (props) => {
  const { course } = props;
  const dispatch = useDispatch();
  const {
    addRemoveCart: { loading },
  } = useSelector((state) => state.auth);

  const handleRemove = () => dispatch(removeFromCart(course._id));

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between p-2 border border-solid border-border rounded-md'>
      <Link passHref href={`/course/${course.slug}`}>
        <div className='flex cursor-pointer'>
          <Image src={Books} alt='books' width='120' height='70' />
          <div className='px-2'>
            <h2 className='font-medium'>{course.title}</h2>
            <p className='text-labelText text-sm'>{getInstructors(course)}</p>
            <div className='text-labelText text-xs flex mt-3 divide-x'>
              <p className='pr-2'>{getCourseDuration(course.duration)}</p>
              <p className='px-2'>{course.level}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className='flex gap-16 px-10'>
        <div className='text-sm'>
          <button
            onClick={handleRemove}
            disabled={loading}
            className='cursor-pointer'
          >
            Remove
          </button>
        </div>
        <p className='text-primary font-semibold'>{getCoursePrice(course)}</p>
      </div>
    </div>
  );
};

export default CartCard;
