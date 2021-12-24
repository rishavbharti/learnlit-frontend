import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from 'src/components/Button';
import Input from 'src/components/Input';

const ChapterForm = (props) => {
  const { onSubmit } = props;

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  return (
    <div className='flex flex-col gap-3 h-min'>
      <h2 className='text-lg font-semibold'>Chapter</h2>

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

export default ChapterForm;
