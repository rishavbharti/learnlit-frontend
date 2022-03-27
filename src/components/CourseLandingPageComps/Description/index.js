import React from 'react';
import DOMPurify from 'dompurify';

const Description = ({ description }) => {
  if (!description) return null;

  return (
    <div>
      <h3 className='font-bold text-2xl mb-4'>Description</h3>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    </div>
  );
};

export default Description;
