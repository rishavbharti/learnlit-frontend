import * as React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import Logo from '../Logo';
import Searchbar from '../Searchbar';
import Submenu from './components/Submenu';
import Button from '../Button';
import ProfileMenu from './components/ProfileMenu';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <div className='hidden md:flex gap-8'>
          <div className='hidden lg:block'>
            <Link href='/instructor'>
              <a>Instructor</a>
            </Link>
          </div>

          <Link href='/my-courses'>
            <a>My learning</a>
          </Link>
        </div>
      );
    }
  };

  const renderCart = () => {
    return (
      <IconButton
        size='large'
        aria-label='shopping cart'
        color='inherit'
        className='mx-5'
      >
        <ShoppingCartOutlinedIcon />
      </IconButton>
    );
  };

  const renderAuthCTAs = () => {
    if (!isAuthenticated) {
      return (
        <div className='hidden md:flex gap-3'>
          <Link href='/login' passHref>
            <Button label='Sign In' variant='outlined' />
          </Link>

          <Link href='/signup' passHref>
            <Button label='Sign Up' variant='contained' />
          </Link>
        </div>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='body'>
        <Toolbar className='h-20 lg:px-24'>
          <Logo variant='header' />
          <div className='hidden md:flex items-center'>
            <Submenu />
            <Searchbar />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <div className='flex items-center'>
            {renderLinks()}
            {renderCart()}
            {renderAuthCTAs()}
            {isAuthenticated && <ProfileMenu />}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}