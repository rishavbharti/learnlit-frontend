import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: '0.6rem 1.5rem',
  borderRadius: 6,
}));

export default function Button(props) {
  const { label, ...otherProps } = props;

  return (
    <StyledButton {...otherProps} disableElevation>
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
};
