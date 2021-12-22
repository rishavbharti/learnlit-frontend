import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import CenterAligned from 'src/components/CenterAligned';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

const CreateCourseCurriculum = () => {
  const { data } = useSelector((state) => state.courses.course);
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const [renderAddChapterForm, setRenderAddChapterForm] = useState(false);
  const [renderAddLectureForm, setRenderAddLectureForm] = useState(false);
  const [curriculum, setCurriculum] = useState(data?.curriculum || []);

  const onSubmit = (data) => {
    console.log(data);
    setCurriculum([...curriculum, data]);
    console.log(curriculum);
  };

  const addNewChapterForm = () => {
    return (
      <div className='flex flex-col gap-3'>
        <h2 className='text-lg font-semibold'>Add new Chapter</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col sm:flex-row gap-2'
        >
          <Controller
            name='chapterTitle'
            control={control}
            rules={{
              required: 'Chapter title is required.',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters.',
              },
              maxLength: {
                value: 80,
                message: 'Title must be maximum 80 characters.',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Title'
                type='text'
                placeholder='Title'
                variant='filled'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
                className='sm:w-3/4'
              />
            )}
          />

          <Controller
            name='duration'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Duration'
                type='time'
                placeholder='duration'
                variant='filled'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
                className='sm:w-1/4'
              />
            )}
          />
        </form>

        <Button
          label='Add'
          className='bg-primary w-min ml-auto'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    );
  };

  const renderForm = () => {
    if (
      !data?.curriculum.length &&
      !renderAddChapterForm &&
      !renderAddLectureForm
    ) {
      return (
        <CenterAligned className='py-20 gap-5'>
          <AddCircleOutlineOutlinedIcon fontSize='large' />
          <p className='font-medium'>Start by creating the First Chapter</p>
          <Button
            label='Add new Chapter'
            className='bg-primary'
            variant='contained'
            onClick={() => setRenderAddChapterForm(true)}
          />
        </CenterAligned>
      );
    }

    if (renderAddChapterForm) {
      return addNewChapterForm();
    }
  };

  return (
    <div>
      {/* <div className='flex gap-3 border border-solid border-border p-5'>
        <InfoOutlinedIcon />
        <h3>
          Here’s where you add course content—like lectures, course sections,
          assignments, and more. Click the + icon below to get started.
        </h3>
      </div> */}
      <Alert severity='info' variant='outlined'>
        Here’s where you add course content—like lectures, course sections,
        assignments, and more. Click the button below to get started.
      </Alert>
      <div className='flex flex-col lg:flex-row gap-5 mt-5'>
        <div className='w-full lg:w-2/3 bg-secondaryBg p-3'>{renderForm()}</div>
        <div className='w-full lg:w-1/3 bg-secondaryBg p-3'>
          {curriculum.map((chapter, index) => (
            <h4 key={index}>{chapter.chapterTitle}</h4>
          ))}
          + Add new chapter
        </div>
      </div>
    </div>
  );
};

export default CreateCourseCurriculum;
