import React from 'react';
import classnames from 'classnames';

import Button from 'src/components/Button';

const MenuPageLayout = (props) => {
  const { title, loading, handleSave, containerClass } = props;

  return (
    <div>
      <div className='p-6 pt-0 border-b border-labelText mb-8 flex justify-between'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <Button
          label='Save'
          type='submit'
          onClick={handleSave}
          loading={loading}
        />
      </div>
      <div className={classnames('lg:pl-6 lg:pr-32', containerClass)}>
        {props.children}
      </div>
    </div>
  );
};

export default MenuPageLayout;
