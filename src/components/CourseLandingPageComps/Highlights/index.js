import React from 'react';
import DoneIcon from '@mui/icons-material/Done';

const Highlights = ({ highlights }) => {
  if (!highlights) return null;

  const renderPoints = () => {
    return (
      <div className='grid grid-cols-2 gap-2 text-tiny'>
        {highlights.map(({ points }, index) => (
          <p key={index} className='flex gap-3'>
            <span>
              <DoneIcon fontSize='small' />
            </span>
            {points}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className='p-4 border border-border'>
      <h3 className='font-bold text-2xl mb-4'>What you&apos;ll learn</h3>
      {renderPoints()}
    </div>
  );
};

export default Highlights;
