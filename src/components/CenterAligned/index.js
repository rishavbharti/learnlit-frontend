import React from 'react';
import classnames from 'classnames';

const CenterAligned = (props) => {
  const { className } = props;

  return (
    <div className={classnames('grid place-items-center h-max', className)}>
      {props.children}
    </div>
  );
};

export default CenterAligned;
