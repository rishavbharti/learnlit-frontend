import PropTypes from 'prop-types';
import classnames from 'classnames';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

export default function ChapterItem(props) {
  const { lecture, active } = props;

  return (
    <div className='flex justify-between gap-5 items-center xl:mx-6 group'>
      <div className='flex gap-5 items-center'>
        {lecture.class === 'Lecture' ? (
          <OndemandVideoOutlinedIcon fontSize='small' />
        ) : (
          <QuizOutlinedIcon fontSize='small' />
        )}
        <p
          className={classnames('break-all group-hover:text-labelText', {
            'underline text-primary': active,
          })}
        >
          {lecture.title}
        </p>
      </div>
      <p className='text-labelText text-sm'>{lecture?.duration}</p>
    </div>
  );
}

ChapterItem.propTypes = {
  lecture: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};
