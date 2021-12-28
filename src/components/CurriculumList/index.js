import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Button from 'src/components/Button';
import ListItem from './ListItem';
import {
  setCurrChapterData,
  setCurrChapterIndex,
  setIsEditMode,
  setRenderChapterForm,
  setRenderLectureForm,
} from 'redux/slice/course';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1.3),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CurriculumList() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.courses.course);

  const renderLectures = (lectures, chapterIndex) => {
    return lectures.map((lecture, index) => {
      const handleClick = (event) => {
        event.stopPropagation();

        // scrollElementIntoView(lectureId);
      };

      return (
        <AccordionDetails
          className={classnames('group cursor-pointer hover:bg-accordionBg')}
          id={index}
          onClick={handleClick}
          key={index}
        >
          <ListItem
            lecture={lecture}
            chapterIndex={chapterIndex}
            lectureIndex={index}
          />
        </AccordionDetails>
      );
    });
  };

  const renderChapter = (chapter, index) => {
    return (
      <div className='border border-solid border-border'>
        <Accordion TransitionProps={{ unmountOnExit: true }} key={index}>
          <AccordionSummary>
            <div className='flex gap-5 justify-between items-center w-full mr-5'>
              <p className='text-body break-all font-semibold'>
                {chapter.chapterTitle}
              </p>
              <p className='text-labelText text-sm'>{chapter?.duration}</p>
            </div>
            <div className='flex gap-3'>
              <IconButton aria-label='edit' size='small'>
                <EditOutlinedIcon
                  fontSize='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setCurrChapterIndex(index));
                    dispatch(setCurrChapterData(chapter));
                    dispatch(setIsEditMode(true));
                    dispatch(setRenderChapterForm());
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
          </AccordionSummary>
          {chapter?.content && renderLectures(chapter.content, index)}
        </Accordion>
        <Button
          label='Add Chapter Item'
          className='w-full normal-case'
          startIcon={<AddIcon />}
          onClick={() => {
            dispatch(setCurrChapterIndex(index));
            dispatch(setIsEditMode(false));
            dispatch(setRenderLectureForm());
          }}
        />
      </div>
    );
  };

  const renderAccordion = () =>
    data?.curriculum.map((chapter, index) => renderChapter(chapter, index));

  return <>{renderAccordion()}</>;
}

CurriculumList.propTypes = {};
