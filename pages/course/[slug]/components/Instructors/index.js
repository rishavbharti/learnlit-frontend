import React from 'react';
import DOMPurify from 'dompurify';

const Instructors = ({ data }) => {
  if (!data) return null;

  const instructor = data?.[0];

  const renderProfile = () => {
    return (
      <div>
        <p className='font-bold text-xl'>
          {instructor.name}
          <span className='text-labelText text-sm font-normal'>
            , {instructor.headline}
          </span>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(instructor?.bio),
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <h3 className='font-bold text-2xl mb-4'>Instructor</h3>
      {renderProfile()}
    </div>
  );
};

export default Instructors;
