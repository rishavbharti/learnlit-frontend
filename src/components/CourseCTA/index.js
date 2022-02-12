import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Button from 'src/components/Button';
import { addToCart, addToWishlist, removeFromWishlist } from 'redux/slice/auth';

const CourseCTA = (props) => {
  const { course } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    isAuthenticated,
    profile,
    addRemoveCart: { loading: addRemoveCartLoading },
    addRemoveWishlist: { loading: addRemoveWishlistLoading },
  } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) return router.push('/login');
    dispatch(addToCart(course._id));
  };
  const handleGotoCart = () => router.push('/cart');

  const handleAddToWishlist = () => {
    if (!isAuthenticated) return router.push('/login');
    dispatch(addToWishlist(course._id));
  };

  const handleRemoveFromWishlist = () =>
    dispatch(removeFromWishlist(course._id));

  const handleLearnClick = () => router.push(`/course/${course.slug}/learn`);

  const purchaseAndLearnCTA = () => {
    if (
      isAuthenticated &&
      profile?.enrolledCourses.some((c) => c.course === course._id)
    ) {
      return (
        <Button
          label='Go to course'
          className='w-full py-3 font-semibold'
          onClick={handleLearnClick}
        />
      );
    }

    if (!isAuthenticated || !profile?.cart.includes(course._id)) {
      return (
        <Button
          label='Add to cart'
          className='w-full py-3 font-semibold'
          loading={addRemoveCartLoading}
          onClick={handleAddToCart}
        />
      );
    }

    if (profile?.cart.includes(course._id)) {
      return (
        <Button
          label='Go to cart'
          className='w-full py-3 font-semibold'
          loading={addRemoveCartLoading}
          onClick={handleGotoCart}
        />
      );
    }

    return null;
  };

  const wishlistCTA = () => {
    if (profile?.enrolledCourses.some((c) => c.course === course._id)) {
      return null;
    }

    if (!isAuthenticated || !profile?.wishlist.includes(course._id)) {
      return (
        <Button
          variant='outlined'
          onClick={handleAddToWishlist}
          loading={addRemoveWishlistLoading}
        >
          <FavoriteBorderIcon />
        </Button>
      );
    }

    if (profile?.wishlist.includes(course._id)) {
      return (
        <Button
          variant='outlined'
          onClick={handleRemoveFromWishlist}
          loading={addRemoveWishlistLoading}
        >
          <FavoriteIcon />
        </Button>
      );
    }

    return null;
  };

  return (
    <div className='flex gap-3 my-3'>
      {purchaseAndLearnCTA()}
      {wishlistCTA()}
    </div>
  );
};

export default CourseCTA;
