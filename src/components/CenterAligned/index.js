import React from 'react';
import clsx from 'clsx';

const CenterAligned = (props) => {
  const { className } = props;

  return (
    <div className={clsx('grid place-items-center h-max', className)}>
      {props.children}
    </div>
  );
};

export default CenterAligned;
