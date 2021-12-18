import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

import { getInitials } from 'src/utils';
import { logout } from 'redux/slice/auth';
import { becomeInstructor } from 'redux/slice/instructor';

export default function AccountMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { profile } = useSelector((state) => state.auth);
  const { profile: instructorProfile } = useSelector(
    (state) => state.instructor
  );

  const handleBecomeInstructor = () => {
    dispatch(becomeInstructor());
  };

  const menus =
    profile?.role.includes('Instructor') || instructorProfile
      ? [
          {
            icon: Settings,
            label: 'Settings',
          },
        ]
      : [
          {
            icon: CastForEducationIcon,
            label: 'Become an Instructor',
            handleClick: handleBecomeInstructor,
          },
          {
            icon: Settings,
            label: 'Settings',
          },
        ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <React.Fragment>
      <Avatar
        alt={profile?.name}
        className='cursor-pointer'
        onMouseOver={handleClick}
      >
        {profile && getInitials(profile.name)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {menus.map((item, index) => {
          return (
            <MenuItem key={index} onClick={item?.handleClick}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              {item.label}
            </MenuItem>
          );
        })}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
