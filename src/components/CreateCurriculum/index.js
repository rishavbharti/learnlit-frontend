import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import CenterAligned from 'src/components/CenterAligned';
import Button from 'src/components/Button';
import CurriculumList from 'src/components/CurriculumList';
import ChapterForm from './ChapterForm';
import LectureForm from './LectureForm';

const CreateCurriculum = () => {
  const { data } = useSelector((state) => state.courses.course);
  const [renderChapterForm, setRenderChapterForm] = useState(false);
  const [renderLectureForm, setRenderLectureForm] = useState(false);
  const [currChapterIndex, setCurrChapterIndex] = useState();
  const [curriculum, setCurriculum] = useState(data?.curriculum || []);

  const handleChapterSubmit = (data) => {
    data.content = [];
    setCurriculum([...curriculum, data]);
  };

  const handleLectureSubmit = (data) => {
    const newCurriculum = curriculum.map((chapter, index) => {
      if (index === currChapterIndex) {
        chapter.content = [...chapter.content, data];
        // break
      }
      return chapter;
    });
    setCurriculum(newCurriculum);
    console.log(curriculum);
  };

  const showChapterForm = () => {
    setRenderLectureForm(false);
    setRenderChapterForm(true);
  };

  const showLectureForm = (index) => {
    setCurrChapterIndex(index);
    setRenderChapterForm(false);
    setRenderLectureForm(true);
  };

  const renderForm = () => {
    if (!data?.curriculum.length && !renderChapterForm && !renderLectureForm) {
      return (
        <CenterAligned className='py-20 gap-5'>
          <AddCircleOutlineOutlinedIcon fontSize='large' />
          <p className='font-medium'>Start by creating the First Chapter</p>
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
      return <ChapterForm onSubmit={handleChapterSubmit} />;
    }

    if (renderLectureForm) {
      return <LectureForm onSubmit={handleLectureSubmit} />;
    }
  };

  return (
    <div>
      <Alert severity='info' variant='outlined'>
        Here’s where you add course content—like lectures, course sections,
        assignments, and more. Click the button below to get started.
      </Alert>
      <div className='flex flex-col lg:flex-row gap-5 mt-5'>
        <div className='w-full lg:w-2/3 bg-formBg p-3'>{renderForm()}</div>
        <div className='w-full lg:w-1/3 bg-formBg p-3'>
          <CurriculumList
            curriculum={curriculum}
            onChapterClick={showChapterForm}
            onLectureClick={showLectureForm}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCurriculum;
