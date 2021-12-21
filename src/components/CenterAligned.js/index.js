import React from 'react';

const CenterAligned = (props) => {
  return <div className='grid place-items-center h-max'>{props.children}</div>;
};

export default CenterAligned;
