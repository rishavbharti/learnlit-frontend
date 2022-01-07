import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomizedTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '2px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create(['background-color', 'border']),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

const Input = (props) => {
  const { variant, ...otherProps } = props;

  return (
    <CustomizedTextField
      variant={variant}
      size={variant === 'filled' && 'small'}
      style={{ marginTop: 11 }}
      {...otherProps}
    />
  );
};

Input.defaultProps = {
  variant: 'filled',
};

export default Input;
