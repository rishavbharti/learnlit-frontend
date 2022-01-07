import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import ChapterItem from '../ChapterItem';
import {
  deleteChapter,
  setCurrChapterData,
  setCurrChapterIndex,
  setIsEditMode,
  setRenderChapterForm,
  setRenderLectureForm,
} from 'redux/slice/course';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  // border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
});

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
  const [expanded, setExpanded] = useState([]);

  const { data, currChapterIndex } = useSelector(
    (state) => state.courses.course
  );

  useEffect(() => {
    setExpanded([...expanded, currChapterIndex]);
  }, [currChapterIndex]);

  const renderLectures = (lectures, chapterIndex) => {
    return lectures.map((lecture, index) => {
      const handleClick = (event) => {
        event.stopPropagation();

        // scrollElementIntoView(index);
      };

      return (
        <AccordionDetails
          className='cursor-pointer'
          id={index}
          onClick={handleClick}
          key={index}
        >
          <ChapterItem
            lecture={lecture}
            chapterIndex={chapterIndex}
            lectureIndex={index}
          />
        </AccordionDetails>
      );
    });
  };

  const handleChange = (index) => (event, newExpanded) => {
    if (newExpanded) {
      setExpanded([...expanded, index]);
    } else {
      const updatedExpandedItems = expanded.filter((id) => id !== index);
      setExpanded(updatedExpandedItems);
    }
  };

  const renderChapter = (chapter, index) => {
    const handleAddChapterItem = () => {
      dispatch(setCurrChapterIndex(index));
      dispatch(setIsEditMode(false));
      dispatch(setRenderLectureForm());
    };

    const handleEditChapter = (e) => {
      e.stopPropagation();
      dispatch(setCurrChapterIndex(index));
      dispatch(setCurrChapterData(chapter));
      dispatch(setIsEditMode(true));
      dispatch(setRenderChapterForm());
    };

    const handleDeleteChapter = (e) => {
      e.stopPropagation();
      dispatch(deleteChapter(index));
    };

    return (
      <div className='border border-solid border-border'>
        <Accordion
          expanded={expanded.includes(index)}
          onChange={handleChange(index)}
          TransitionProps={{ unmountOnExit: true }}
          key={index}
        >
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
                  onClick={handleEditChapter}
                />
              </IconButton>
              <IconButton aria-label='delete' size='small'>
                <DeleteOutlinedIcon
                  fontSize='small'
                  onClick={handleDeleteChapter}
                />
              </IconButton>
            </div>
          </AccordionSummary>
          {chapter?.content && renderLectures(chapter.content, index)}
        </Accordion>
        <Button
          label='Add Chapter Item'
          variant='transparent'
          className='w-full'
          startIcon={<AddIcon />}
          onClick={handleAddChapterItem}
        />
      </div>
    );
  };

  const renderAccordion = () =>
    data?.curriculum.map((chapter, index) => renderChapter(chapter, index));

  return <>{renderAccordion()}</>;
}
