import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { isBrowser } from 'src/utils';

// export default function WithAuth({ WrappedComponent, redirect = '/login' }) {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const router = useRouter();

//   if (isAuthenticated) return <WrappedComponent />;
//   else router.push(redirect);
// }

export default function withAuth(WrappedComponent, location = '/login') {
  const ConditionalRedirectWrapper = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    if (isBrowser() && isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    if (isBrowser() && !isAuthenticated) {
      router.push({ pathname: location });
      return <></>;
    }

    return null;
  };

  return ConditionalRedirectWrapper;
}
