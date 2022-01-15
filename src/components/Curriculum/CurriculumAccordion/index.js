import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ChapterItem from '../ChapterItem';
import { getChapterDuration } from 'src/utils';

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

export default function CurriculumAccordion(props) {
  const { viewOnly } = props;
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
        if (!viewOnly) return null;

        event.stopPropagation();

        // scrollElementIntoView(index);
      };

      return (
        <AccordionDetails
          className={classnames({ 'cursor-pointer': !viewOnly })}
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
    const totalChapterItem = chapter.content.length;
    const itemText = `lecture${totalChapterItem > 1 ? 's' : ''}`;

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
              <div className='flex gap-2 items-center text-labelText text-sm'>
                <p>
                  {totalChapterItem} {itemText}
                </p>
                {chapter?.duration && (
                  <p>&#8226; {getChapterDuration(chapter?.duration)}</p>
                )}
              </div>
            </div>
          </AccordionSummary>
          {chapter?.content && renderLectures(chapter.content, index)}
        </Accordion>
      </div>
    );
  };

  const renderAccordion = () =>
    data?.curriculum.map((chapter, index) => renderChapter(chapter, index));

  return <div>{renderAccordion()}</div>;
}

CurriculumAccordion.propTypes = {
  activeContent: PropTypes.shape({
    chapterId: PropTypes.string,
    lectureId: PropTypes.string,
  }),
  setActiveContent: PropTypes.func,
  viewOnly: PropTypes.bool,
};
