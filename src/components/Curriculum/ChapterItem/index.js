import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

export default function ChapterItem(props) {
  const { lecture, chapterIndex, lectureIndex } = props;
  const dispatch = useDispatch();

  return (
    <div className='flex gap-5 mx-6'>
      <div className='flex justify-between gap-5 items-center w-full'>
        <div className='flex gap-5 items-center'>
          {lecture.class === 'Lecture' ? (
            <OndemandVideoOutlinedIcon />
          ) : (
            <QuizOutlinedIcon />
          )}
          <p className='break-all'>{lecture.title}</p>
        </div>
        <p className='text-labelText text-sm'>{lecture?.duration}</p>
      </div>
    </div>
  );
}

ChapterItem.propTypes = {
  lecture: PropTypes.object.isRequired,
  chapterIndex: PropTypes.number.isRequired,
  lectureIndex: PropTypes.number.isRequired,
};
