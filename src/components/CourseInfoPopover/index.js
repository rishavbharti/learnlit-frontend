import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Button from 'src/components/Button';

const Info = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.body,
    color: theme.palette.text.main,
    maxWidth: 350,
    padding: '1.3rem',
    boxShadow: '0px 4px 40px 0px #00000029',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.body,
  },
}));

const CourseInfoPopover = (props) => {
  const { children, course } = props;
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  const purchaseCTA = () => {
    if (!isAuthenticated || !profile?.cart.includes(course._id)) {
      return (
        <Button label='Add to cart' className='w-full py-3 font-semibold' />
      );
    }

    if (profile?.cart.includes(course._id)) {
      return (
        <Button
          label='Remove from cart'
          className='w-full py-3 font-semibold'
        />
      );
    }

    if (profile?.enrolledCourses.includes(course._id)) {
      return (
        <Button label='Go to course' className='w-full py-3 font-semibold' />
      );
    }

    return null;
  };

  const wishlistCTA = () => {
    if (!isAuthenticated || !profile?.wishlist.includes(course._id)) {
      return (
        <Button variant='outlined'>
          <FavoriteBorderIcon />
        </Button>
      );
    }

    if (profile?.wishlist.includes(course._id)) {
      return (
        <Button variant='outlined'>
          <FavoriteIcon />
        </Button>
      );
    }

    return null;
  };

  const renderHighlights = () => {
    if (!course.highlights) return null;

    const topHighlights = course.highlights.slice(0, 3);

    return (
      <div className='flex flex-col gap-2 text-sm mt-2'>
        {topHighlights.map(({ points }, index) => (
          <p key={index} className='flex gap-3'>
            <span>
              <DoneIcon fontSize='small' />
            </span>
            {points}
          </p>
        ))}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className='flex flex-col gap-1'>
        <h3 className='text-xl font-bold'>{course.title}</h3>
        <p className='text-labelText text-sm'>{course.level}</p>
        <p className='text-sm'>{course.subtitle}</p>
        {renderHighlights()}
        <div className='flex gap-3 my-3'>
          {purchaseCTA()}
          {wishlistCTA()}
        </div>
      </div>
    );
  };

  return (
    <Info
      title={renderInfo()}
      arrow
      interactive
      placement='right'
      PopperProps={{
        popperOptions: {
          placement: 'auto',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left', 'right'],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Info>
  );
};

export default CourseInfoPopover;
