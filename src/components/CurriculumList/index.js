import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Button from 'src/components/Button';
import ListItem from './ListItem';

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
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CurriculumList(props) {
  const { curriculum, onChapterClick, onLectureClick } = props;

  const renderLectures = (lectures) => {
    return lectures.map((lecture, index) => {
      const handleClick = (event) => {
        event.preventDefault();
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
          <ListItem title={lecture.title} duration={lecture.duration} />
        </AccordionDetails>
      );
    });
  };

  const renderChapter = (chapter, index) => {
    return (
      <div className='border border-solid border-border'>
        <Accordion TransitionProps={{ unmountOnExit: true }} key={index}>
          <AccordionSummary>
            <p className='text-body font-semibold'>{chapter.chapterTitle}</p>
          </AccordionSummary>
          {chapter?.content && renderLectures(chapter.content)}
        </Accordion>
        <Button
          label='Add Chapter Item'
          className='w-full normal-case'
          startIcon={<AddIcon />}
          onClick={() => onLectureClick(index)}
        />
      </div>
    );
  };

  const renderAccordion = () =>
    curriculum.map((chapter, index) => renderChapter(chapter, index));

  return (
    <>
      {renderAccordion()}
      <div className='bg-tertiaryBg mt-5 p-2'>
        <Button
          label='Add new Chapter'
          className='text-lg normal-case rounded-none bg-tertiaryBg'
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={onChapterClick}
        />
      </div>
    </>
  );
}

CurriculumList.propTypes = {
  activeContent: PropTypes.shape({
    moduleId: PropTypes.string,
    lectureId: PropTypes.string,
  }),
  setActiveContent: PropTypes.func,
  viewOnly: PropTypes.bool,
  moduleIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  moduleLectureMap: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};
