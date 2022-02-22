import React from 'react';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Logo from '../Logo';

const Footer = () => {
  return (
    <div className='bg-footerBg text-secondaryText px-8 xl:px-24 pt-16 pb-14'>
      <div className='flex flex-col md:flex-row gap-8 justify-between items-center'>
        <Logo variant='footer' />
        <div className='flex divide-x-2 text-sm'>
          <p className='pr-3'>About us</p>
          <p className='px-3'>Contact us</p>
          <p className='px-3'>Teach on learnlit</p>
          <p className='px-3'>Terms</p>
          <p className='pl-3'>Blog</p>
        </div>
      </div>

      <div className='flex justify-between items-center text-sm mt-10'>
        <div className='flex gap-4 ml-4'>
          <a
            href='https://twitter.com/learnlit_in'
            target='_blank'
            rel='noreferrer'
          >
            <TwitterIcon fontSize='small' />
          </a>
          <a
            href='http://instagram.com/learnlit'
            target='_blank'
            rel='noreferrer'
          >
            <InstagramIcon fontSize='small' />
          </a>
          <a href='http://facebook.com/' target='_blank' rel='noreferrer'>
            <FacebookIcon fontSize='small' />
          </a>
          <a href='http://youtube.com/' target='_blank' rel='noreferrer'>
            <YouTubeIcon fontSize='small' />
          </a>
        </div>
        <p>
          Developed by{'  '}
          <span className='text-primary'>
            <a
              href='https://www.linkedin.com/in/rishavbharti/'
              target='_blank'
              rel='noreferrer'
            >
              Rishav Bharti
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
