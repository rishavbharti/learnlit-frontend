import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import {
  deleteLecture,
  setCurrChapterIndex,
  setCurrLectureData,
  setCurrLectureIndex,
  setIsEditMode,
  setRenderLectureForm,
} from 'redux/slice/course';

export default function ChapterItem(props) {
  const { lecture, chapterIndex, lectureIndex } = props;
  const dispatch = useDispatch();

  const handleEditClick = (e) => {
    e.stopPropagation();
    dispatch(setCurrChapterIndex(chapterIndex));
    dispatch(setCurrLectureIndex(lectureIndex));
    dispatch(setCurrLectureData(lecture));
    dispatch(setIsEditMode(true));
    dispatch(setRenderLectureForm());
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(
      deleteLecture({ chapterIndex: chapterIndex, lectureIndex: lectureIndex })
    );
  };

  return (
    <div className='flex gap-5 ml-6'>
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
      <div className='flex gap-3'>
        <IconButton aria-label='edit' size='small'>
          <EditOutlinedIcon fontSize='small' onClick={handleEditClick} />
        </IconButton>
        <IconButton aria-label='delete' size='small'>
          <DeleteOutlinedIcon fontSize='small' onClick={handleDeleteClick} />
        </IconButton>
      </div>
    </div>
  );
}

ChapterItem.propTypes = {
  lecture: PropTypes.object.isRequired,
  chapterIndex: PropTypes.number.isRequired,
  lectureIndex: PropTypes.number.isRequired,
};
