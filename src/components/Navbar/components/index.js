import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label='open drawer'
      sx={{ mr: 2 }}
      className='md:hidden'
    >
      <MenuIcon />
    </IconButton>
  );
};

export default Sidebar;
