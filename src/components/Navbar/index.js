import React from 'react';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Logo from '../Logo';
import Searchbar from '../Searchbar';
import Submenu from './components/Submenu';
import Button from '../Button';
import ProfileMenu from './components/ProfileMenu';
// import MobileMenu from './components/MobileMenu';

export default function Navbar() {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);
  const { profile: instructorProfile } = useSelector(
    (state) => state.instructor
  );

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

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

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
          {(profile?.role.includes('Instructor') || instructorProfile) && (
            <Link href='/instructor/courses'>
              <a>Instructor</a>
            </Link>
          )}

          <Link href='/my-courses'>
            <a>My learning</a>
          </Link>
        </div>
      );
    }
  };

  const renderWishlistAndCart = () => {
    return (
      <div className='flex mx-5 gap-2'>
        <Link href='/wishlist' passHref>
          <IconButton size='large' aria-label='wishlist' color='inherit'>
            <Badge badgeContent={profile?.wishlist.length} color='primary'>
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        </Link>

        <Link href='/cart' passHref>
          <IconButton size='large' aria-label='shopping cart' color='inherit'>
            <Badge badgeContent={profile?.cart.length} color='primary'>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Link>
      </div>
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
            <Button label='Sign Up' />
          </Link>
        </div>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='body'>
        <Toolbar className='h-20 lg:px-24'>
          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            // onClick={handleDrawerOpen}
            edge='start'
            // sx={{ mr: 2, ...(open && { display: 'none' }) }}
            className='md:hidden'
          >
            <MenuIcon />
          </IconButton> */}
          {/* <MobileMenu /> */}
          <Logo variant='header' />
          <div className='hidden md:flex w-1/2 items-center'>
            <Submenu />
            <Searchbar />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <div className='flex items-center'>
            {renderLinks()}
            {renderWishlistAndCart()}
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
