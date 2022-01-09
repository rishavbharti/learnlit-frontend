import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'src/components/Button';
import DropdownInput from 'src/components/DropdownInput';
import Input from 'src/components/Input';

import { addLecture, editLecture } from 'redux/slice/course';

const LectureForm = () => {
  const dispatch = useDispatch();
  const { isEditMode, currLectureData } = useSelector(
    (state) => state.courses.course
  );

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      class: '',
      duration: '',
      embedUrl: '',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setValue('title', currLectureData.title, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('class', currLectureData.class, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('duration', currLectureData.duration, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('embedUrl', currLectureData.embedUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [isEditMode, setValue, currLectureData]);

  return (
    <div className='flex flex-col gap-3 h-min'>
      <h2 className='text-lg font-semibold'>
        {isEditMode ? 'Edit Chapter Item' : 'Add new Chapter Item'}
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex flex-col gap-2'
      >
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
              className='w-full'
            />
          )}
        />

        <div className='flex items-center gap-5'>
          <Controller
            name='class'
            control={control}
            rules={{
              required: 'Class Type is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <DropdownInput
                label='Class Type'
                data={[{ title: 'Lecture' }, { title: 'Quiz' }]}
                error={!!error}
                helperText={error ? error.message : null}
                required
                value={field.value}
                handleChange={field.onChange}
                valueExtractor={(datum) => datum.title}
                labelExtractor={(datum) => datum.title}
                containerClass='w-1/2 mt-3'
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
                className='w-1/2'
              />
            )}
          />
        </div>

        <Controller
          name='embedUrl'
          control={control}
          rules={{
            required: 'Embed URL is required.',
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              label='Embed URL'
              type='url'
              placeholder='https://example.com'
              error={!!error}
              helperText={error ? error.message : null}
              required
              {...field}
              className='w-full'
            />
          )}
        />
      </form>

      <Button
        label={isEditMode ? 'Update' : 'Add'}
        className='w-min ml-auto'
        onClick={handleSubmit((data) => {
          isEditMode
            ? dispatch(editLecture({ data }))
            : dispatch(addLecture({ data }));

          reset();
        })}
      />
    </div>
  );
};

export default LectureForm;
