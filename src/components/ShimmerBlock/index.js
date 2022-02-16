import React from 'react';
import classnames from 'classnames';

const ShimmerBlock = ({ style, className, ...restProps }) => {
  return (
    <div
      className={classnames(
        'bg-shimmer animate-pulse w-full h-full',
        className
      )}
      style={style}
      {...restProps}
    />
  );
};

export default ShimmerBlock;
