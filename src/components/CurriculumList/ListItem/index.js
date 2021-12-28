import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import {
  setCurrChapterIndex,
  setCurrLectureData,
  setCurrLectureIndex,
  setIsEditMode,
  setRenderLectureForm,
} from 'redux/slice/course';
export default function ListItem(props) {
  const { lecture, chapterIndex, lectureIndex } = props;
  const dispatch = useDispatch();

  return (
    <div className='flex gap-5 ml-6'>
      <div className='flex justify-between gap-5 items-center w-full'>
        <div className='flex gap-5 items-center'>
          {lecture.class === 'Lecture' ? (
            <OndemandVideoOutlinedIcon />
          ) : (
            <QuizOutlinedIcon />
          )}
          <p
            className={classnames('break-all group-hover:text-mainText', {
              // 'underline text-primaryBtn': active,
            })}
          >
            {lecture.title}
          </p>
        </div>
        <p className='text-labelText text-sm group-hover:text-mainText'>
          {lecture?.duration}
        </p>
      </div>
      <div className='flex gap-3'>
        <IconButton aria-label='edit' size='small'>
          <EditOutlinedIcon
            fontSize='small'
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setCurrChapterIndex(chapterIndex));
              dispatch(setCurrLectureIndex(lectureIndex));
              dispatch(setCurrLectureData(lecture));
              dispatch(setIsEditMode(true));
              dispatch(setRenderLectureForm());
            }}
          />
        </IconButton>
        <IconButton aria-label='delete' size='small'>
          <DeleteOutlinedIcon
            fontSize='small'
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

ListItem.propTypes = {};
