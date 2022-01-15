import React from 'react';

const Points = ({ title, data }) => {
  if (!data) return null;

  const renderPoints = () => {
    return (
      <div className='text-tiny'>
        {data.map(({ points }, index) => (
          <p key={index} className='flex items-center'>
            <span className='mr-4 text-2xl'>&#8226;</span> {points}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3 className='font-bold text-2xl mb-4'>{title}</h3>
      {renderPoints()}
    </div>
  );
};

export default Points;
