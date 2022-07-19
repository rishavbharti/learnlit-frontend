import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { isBrowser } from 'src/utils';

export default function withAuth(WrappedComponent, location = '/login') {
  const ConditionalRedirectWrapper = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    if (isBrowser()) {
      if (isAuthenticated) {
        return <WrappedComponent {...props} />;
      }

      if (!isAuthenticated) {
        router.push({ pathname: location });
        return <></>;
      }
    }

    return null;
  };

  return ConditionalRedirectWrapper;
}
