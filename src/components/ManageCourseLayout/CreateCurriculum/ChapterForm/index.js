import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'src/components/Button';
import Input from 'src/components/Input';

import { addChapter, editChapter } from 'redux/slice/course';

const ChapterForm = () => {
  const dispatch = useDispatch();
  const { isEditMode, currChapterData } = useSelector(
    (state) => state.courses.course
  );

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      chapterTitle: '',
      duration: '',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setValue('chapterTitle', currChapterData.chapterTitle, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('duration', currChapterData.duration, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [isEditMode, setValue, currChapterData]);

  return (
    <div className='flex flex-col gap-3 h-min'>
      <h2 className='text-lg font-semibold'>
        {isEditMode ? 'Edit Chapter' : 'Add new Chapter'}
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
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
              inputProps={{ step: 2 }}
              placeholder='duration'
              error={!!error}
              helperText={error ? error.message : null}
              {...field}
              className='sm:w-1/4'
            />
          )}
        />
      </form>

      <Button
        label={isEditMode ? 'Update' : 'Add'}
        className='w-min ml-auto'
        onClick={handleSubmit((data) => {
          isEditMode
            ? dispatch(editChapter({ data }))
            : dispatch(addChapter({ data }));

          reset();
        })}
      />
    </div>
  );
};

export default ChapterForm;
