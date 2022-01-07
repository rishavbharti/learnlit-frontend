import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';

import DialogBox from 'src/components/Dialog';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import DropdownInput from 'src/components/DropdownInput';

import { getCategories } from 'redux/slice/courseCategories';
import { createCourse, resetCreateState } from 'redux/slice/course';
import { closeDialog } from 'redux/slice/dialog';

const CreateCourseDialog = () => {
  const { categories } = useSelector((state) => state.courseCategories);
  const {
    create: { loading, success, errorMessage },
  } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const {
    control,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      reset();
      dispatch(closeDialog());
      dispatch(resetCreateState());
    }
  }, [dispatch, success, reset]);

  const onSubmit = (data) => {
    dispatch(createCourse(data));
  };

  const renderDialogAction = () => {
    return (
      <Button
        type='submit'
        onClick={handleSubmit(onSubmit)}
        label='Create'
        loading={loading}
      />
    );
  };

  const handleCancelClick = () => {
    reset();
    dispatch(resetCreateState());
  };

  const renderDialogContent = () => {
    return (
      <div>
        {errorMessage && (
          <Alert severity='error' className='mb-2'>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='title'
            control={control}
            rules={{
              required: 'Title is required.',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters.',
              },
              maxLength: {
                value: 100,
                message: 'Title must be maximum 100 characters.',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Title'
                type='text'
                placeholder='Title'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />

          <Controller
            name='category'
            control={control}
            rules={{
              required: 'Category is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <DropdownInput
                label='Category'
                data={categories}
                error={!!error}
                helperText={error ? error.message : null}
                required
                value={field.value}
                handleChange={field.onChange}
                valueExtractor={(datum) => datum.title}
                labelExtractor={(datum) => datum.title}
              />
            )}
          />
        </form>
      </div>
    );
  };

  return (
    <DialogBox
      title='Create a new course'
      renderContent={renderDialogContent}
      renderAction={renderDialogAction}
      handleCancelClick={handleCancelClick}
    />
  );
};

export default CreateCourseDialog;
