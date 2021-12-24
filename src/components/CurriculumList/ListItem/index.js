import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function ListItem(props) {
  const { title, duration, active } = props;

  return (
    <div className='flex justify-between items-center text-body w-full'>
      <div className='flex items-center'>
        {/* <img src="/icons/play_button.svg" alt="Play" /> */}
        <p
          className={classnames('ml-24 group-hover:text-mainText', {
            'underline text-primaryBtn': active,
          })}
        >
          {title}
        </p>
      </div>
      <p className='text-labelText group-hover:text-mainText'>{duration}</p>
    </div>
  );
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};
