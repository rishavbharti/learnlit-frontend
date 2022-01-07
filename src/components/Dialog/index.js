import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { closeDialog } from 'redux/slice/dialog';

import Button from '../Button';

export default function DialogBox(props) {
  const { title, subTitle, renderContent, renderAction, handleCancelClick } =
    props;
  const { open } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
    if (typeof handleCancelClick === 'function') handleCancelClick();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>
        <div className='flex flex-col'>
          <span className='font-medium text-2xl'>{title}</span>
          <span className='font-semibold text-lg'>{subTitle}</span>
        </div>
      </DialogTitle>
      <DialogContent>
        {typeof renderContent === 'function' && renderContent()}
      </DialogContent>
      <DialogActions className='px-5 pb-5'>
        <Button onClick={handleClose} label='Cancel' variant='outlined' />
        {typeof renderAction === 'function' && renderAction()}
      </DialogActions>
    </Dialog>
  );
}
