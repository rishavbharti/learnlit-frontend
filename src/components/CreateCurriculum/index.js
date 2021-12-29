import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import CenterAligned from 'src/components/CenterAligned';
import Button from 'src/components/Button';
import CurriculumList from 'src/components/CurriculumList';
import ChapterForm from './ChapterForm';
import LectureForm from './LectureForm';

import { setIsEditMode, setRenderChapterForm } from 'redux/slice/course';

const CreateCurriculum = () => {
  const dispatch = useDispatch();
  const { renderChapterForm, renderLectureForm, data } = useSelector(
    (state) => state.courses.course
  );

  const showChapterForm = () => {
    dispatch(setIsEditMode(false));
    dispatch(setRenderChapterForm());
  };

  const renderForm = () => {
    if (!renderChapterForm && !renderLectureForm) {
      return (
        <CenterAligned className='py-20 gap-5'>
          <AddCircleOutlineOutlinedIcon fontSize='large' />
          <p className='font-medium'>
            {!data?.curriculum.length
              ? 'Start by creating the First Chapter'
              : 'Expand the Curriculum'}
          </p>
          <Button
            label='Add new Chapter'
            className='bg-primary'
            variant='contained'
            onClick={showChapterForm}
          />
        </CenterAligned>
      );
    }

    if (renderChapterForm) {
      return <ChapterForm />;
    }

    if (renderLectureForm) {
      return <LectureForm />;
    }
  };

  return (
    <div>
      <Alert severity='info' variant='outlined'>
        Here’s where you add course content—like lectures, course sections,
        assignments, and more. Click the button below to get started.
      </Alert>
      <div className='flex flex-col lg:flex-row gap-5 mt-5'>
        <div className='w-full lg:w-7/12 bg-formBg p-3 h-min'>
          {renderForm()}
        </div>
        <div
          className='w-full lg:w-5/12 bg-formBg flex flex-col gap-5 p-3'
          style={{ maxHeight: '485px' }}
        >
          <div className='overflow-auto h-5/6'>
            <CurriculumList />
          </div>
          <div className='bg-tertiaryBg p-2 sticky'>
            <Button
              label='Add new Chapter'
              className='text-lg normal-case rounded-none bg-tertiaryBg'
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={showChapterForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCurriculum;
