import React from 'react';
import classnames from 'classnames';

import Tooltip from '@mui/material/Tooltip';

import Button from 'src/components/Button';

const MenuPageLayout = (props) => {
  const { title, handleSave, containerClass } = props;

  return (
    <Tooltip
      placement='top'
      title='Save your changes before navigating away from this page otherwise they will be lost.'
    >
      <div>
        <div className='p-6 pt-0 border-b border-labelText mb-8 flex justify-between'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <Button label='Save' type='submit' onClick={handleSave} />
        </div>
        <div className={classnames('lg:pl-6 lg:pr-32', containerClass)}>
          {props.children}
        </div>
      </div>
    </Tooltip>
  );
};

export default MenuPageLayout;
