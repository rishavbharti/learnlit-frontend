import * as React from 'react';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Logo from 'src/components/Logo';

export default function CourseNavbar(props) {
  const { title, slug } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='body'>
        <Toolbar className='flex items-center gap-10'>
          <Logo variant='header-md' />
          <Link href={`/course/${slug}`}>
            <a>
              <p className='font-medium text-lg mb-1 cursor-pointer'>{title}</p>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
