import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'src/components/Layout';
import CenterAligned from 'src/components/CenterAligned';

import { getWishlist } from 'redux/slice/auth';

import Wishlist from 'public/assets/wishlist.svg';
import CourseInfoCard from 'src/components/CourseInfoCard';

export default function WishlistPage() {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    profile,
    getWishlist: { loading, error },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      dispatch(getWishlist());
    }
  }, [dispatch]);

  const renderWishlist = () => {
    if (!isAuthenticated || !profile?.wishlistCourses?.length) {
      return (
        <CenterAligned>
          <Image src={Wishlist} width='250' height='250' alt='Empty wishlist' />
          <p className='text-labelText mt-5'>
            Your haven&apos;t added any course to your wishlist yet.
          </p>
        </CenterAligned>
      );
    }

    return (
      <div className='flex gap-5'>
        {profile?.wishlistCourses.map((c, i) => (
          <div key={i} className='w-60'>
            <CourseInfoCard course={c} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout loading={loading} error={error}>
      <div className='px-10 xl:px-0 my-10'>
        <h1 className='text-2xl font-semibold mb-5'>Wishlist</h1>
        {renderWishlist()}
      </div>
    </Layout>
  );
}
