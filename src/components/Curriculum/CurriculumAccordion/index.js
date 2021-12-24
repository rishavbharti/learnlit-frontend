import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ThemeContext } from 'themes';

import { scrollElementIntoView } from 'src/lib/utilities';

import Shimmer from 'src/components/Shimmer';
import CurriculumItem from '../CurriculumItem';

export default function CurriculumAccordion({
  activeContent,
  moduleIds,
  moduleLectureMap,
  setActiveContent,
  viewOnly,
  fetchSelectedLectures,
}) {
  const { theme } = useContext(ThemeContext);

  const Accordion = withStyles({
    root: {
      border: `1px solid ${theme.border}`,
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 0,
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: theme.headerBg,
      borderBottom: `1px solid ${theme.border}`,
      marginBottom: -1,
      padding: 0,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expandIcon: {
      order: -1,
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles({
    root: {
      padding: '1.2rem 2.2rem',
      width: '100%',
    },
  })(MuiAccordionDetails);

  const { contentTypesByIds, extraDataByIds } = useSelector(
    (state) => state.contentTypes
  );
  const [expanded, setExpanded] = useState([activeContent.moduleId]);

  const renderLectures = (moduleId) => {
    return moduleLectureMap[moduleId].map((lectureId) => {
      const isLecturePresent =
        extraDataByIds?.[lectureId] && !extraDataByIds[lectureId].loading;

      const handleClick = (event) => {
        if (!viewOnly && isLecturePresent) {
          event.preventDefault();
          event.stopPropagation();
          setActiveContent(moduleId, lectureId);

          scrollElementIntoView(lectureId);
        }
      };

      return (
        <AccordionDetails
          className={classnames({
            'group cursor-pointer hover:bg-accordionBg':
              !viewOnly && isLecturePresent,
          })}
          id={lectureId}
          onClick={handleClick}
          key={lectureId}
        >
          {!extraDataByIds?.[lectureId] || extraDataByIds[lectureId].loading ? (
            <div className='flex justify-between w-full'>
              <Shimmer containerClass='w-3/5' />
              <Shimmer containerClass='w-1/6' />
            </div>
          ) : (
            <CurriculumItem
              title={contentTypesByIds[lectureId].title}
              duration={contentTypesByIds[lectureId].actualmedia[0].duration}
              active={!viewOnly && activeContent.lectureId === lectureId}
            />
          )}
        </AccordionDetails>
      );
    });
  };

  const handleChange = (moduleId) => (event, newExpanded) => {
    if (newExpanded) {
      setExpanded([...expanded, moduleId]);

      fetchSelectedLectures(moduleId);
    } else {
      const updatedExpandedItems = expanded.filter((id) => id !== moduleId);
      setExpanded(updatedExpandedItems);
    }
  };

  const renderModule = (moduleId) => {
    return (
      <Accordion
        square
        expanded={expanded.includes(moduleId)}
        onChange={handleChange(moduleId)}
        TransitionProps={{ unmountOnExit: true }}
        key={moduleId}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fontSize: 30 }} />}
        >
          <p className='text-body font-semibold ml-14'>
            {contentTypesByIds[moduleId].title}
          </p>
        </AccordionSummary>
        {renderLectures(moduleId)}
      </Accordion>
    );
  };

  const renderAccordion = () => {
    return moduleIds.map((moduleId) => {
      return renderModule(moduleId);
    });
  };

  return renderAccordion();
}

CurriculumAccordion.propTypes = {
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
