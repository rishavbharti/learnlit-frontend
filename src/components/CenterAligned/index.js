import React from 'react';
import classnames from 'classnames';

const CenterAligned = (props) => {
  const { className, height } = props;

  const heightClass = {
    max: 'h-max',
    screen: 'h-screen',
  };

  return (
    <div
      className={classnames(
        'grid place-items-center',
        heightClass[height],
        className
      )}
    >
      {props.children}
    </div>
  );
};

CenterAligned.defaultProps = {
  height: 'max',
};

export default CenterAligned;
