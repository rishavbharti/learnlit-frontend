import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { verifyToken } from 'redux/slice/auth';
import Navbar from 'src/components/Navbar';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <Link href='/login'>
        <a>Login</a>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(verifyToken());
        }}
        type='button'
      >
        Verify Token
      </button>

      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
