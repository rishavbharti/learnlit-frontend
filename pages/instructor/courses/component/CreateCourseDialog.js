import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DialogBox from 'src/components/Dialog';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { getCategories } from 'redux/slice/courseCategories';
import DropdownInput from 'src/components/DropdownInput';

const CreateCourseDialog = () => {
  const { categories } = useSelector((state) => state.courseCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderDialogAction = () => {
    return (
      <Button
        type='submit'
        onClick={handleSubmit(onSubmit)}
        label='Create'
        variant='contained'
        className='bg-primary'
      />
    );
  };

  const renderDialogContent = () => {
    return (
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
              variant='filled'
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
    );
  };

  return (
    <DialogBox
      title='Create a new course'
      renderContent={renderDialogContent}
      renderAction={renderDialogAction}
    />
  );
};

export default CreateCourseDialog;
