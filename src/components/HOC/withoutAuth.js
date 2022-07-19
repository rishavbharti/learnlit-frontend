import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { isBrowser } from 'src/utils';

export default function withoutAuth(WrappedComponent, location = '/') {
  const ConditionalRedirectWrapper = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    if (isBrowser() && isAuthenticated) {
      router.push({ pathname: location });
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  return ConditionalRedirectWrapper;
}
