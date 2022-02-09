import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'src/components/Layout';
import CartCard from 'src/components/CartCard';
import Button from 'src/components/Button';
import CenterAligned from 'src/components/CenterAligned';

import { getCart } from 'redux/slice/auth';

import EmptyCart from 'public/assets/empty_cart.svg';

export default function Home() {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    profile,
    getCart: { loading, error },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      dispatch(getCart());
    }
  }, [dispatch]);

  const renderPurchaseValueAndCTA = () => {
    const cartValue = profile?.cartCourses.reduce(
      (total, course) => total + course.price,
      0
    );

    return (
      <div className='w-full md:w-1/4 flex flex-col gap-5'>
        <div>
          <p>Total :</p>
          <p className='text-4xl font-bold'>
            {!cartValue ? 'Free' : `₹ ${cartValue}`}
          </p>
        </div>
        <Button className='py-3 w-full'>Checkout</Button>
      </div>
    );
  };

  const renderCart = () => {
    if (!isAuthenticated || !profile?.cartCourses?.length) {
      return (
        <CenterAligned>
          <Image src={EmptyCart} width='250' height='250' alt='Empty cart' />
          <p className='text-labelText mt-5'>
            Your cart is empty. Keep exploring to find a course.
          </p>
        </CenterAligned>
      );
    }

    return (
      <div className='flex flex-col md:flex-row gap-10 justify-between'>
        <div className='flex flex-col gap-5'>
          {profile?.cartCourses.map((c, i) => (
            <CartCard course={c} key={i} />
          ))}
        </div>
        {renderPurchaseValueAndCTA()}
      </div>
    );
  };

  return (
    <Layout loading={loading} error={error}>
      <div className='px-10 xl:px-0 my-10'>
        <h1 className='text-2xl font-semibold mb-5'>Shopping Cart</h1>
        {renderCart()}
      </div>
    </Layout>
  );
}
