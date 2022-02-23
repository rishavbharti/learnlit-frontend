import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '5rem',
  border: '1px solid #D6D6D6',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(2),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.7, 1.7, 1.7, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30ch',
    },
    [theme.breakpoints.up('xl')]: {
      width: '50ch',
    },
  },
}));

const Searchbar = () => {
  const router = useRouter();
  const query = router.query;
  const [searchText, setSearchText] = useState(query?.q || '');

  const handleChange = ({ target: { value } }) => setSearchText(value);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      router.push(`/courses/search?q=${searchText}`);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    </Search>
  );
};

export default Searchbar;
