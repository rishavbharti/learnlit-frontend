import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MobileMenu = () => {
  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label='open drawer'
      sx={{ mr: 2, display: { xs: 'visible', md: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MobileMenu;
