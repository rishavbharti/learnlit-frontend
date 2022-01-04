import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Input from 'src/components/Input';
import Button from 'src/components/Button';
import MenuPageLayout from '../MenuPageLayout';

const IntendedLearners = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      details: {
        highlights: [{ points: '' }],
        prerequisites: [{ points: '' }],
        targetAudience: [{ points: '' }],
      },
    },
  });

  const {
    fields: highlightFields,
    append: highlightAppend,
    remove: highlightRemove,
  } = useFieldArray({
    control,
    name: 'details.highlights',
  });

  const {
    fields: prerequisiteFields,
    append: prerequisiteAppend,
    remove: prerequisiteRemove,
  } = useFieldArray({
    control,
    name: 'details.prerequisites',
  });

  const {
    fields: targetAudienceFields,
    append: targetAudienceAppend,
    remove: targetAudienceRemove,
  } = useFieldArray({
    control,
    name: 'details.targetAudience',
  });

  const onSubmit = (data) => {
    console.log('data ', data);
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(e) => e.preventDefault()}
        className='flex flex-col gap-8'
      >
        <div>
          <h3 className='font-medium'>
            What will students learn in your course?
          </h3>
          <p className='my-2'>
            You must enter at least 4 learning objectives or outcomes that
            learners can expect to achieve after completing your course.
          </p>
          <ul>
            {highlightFields.map((item, index) => {
              return (
                <li key={item.id} className='flex items-center gap-2'>
                  <Controller
                    name={`details.highlights.${index}.points`}
                    control={control}
                    rules={{
                      required: 'Highlight is required.',
                      minLength: {
                        value: 10,
                        message: 'Highlight must be at least 10 characters.',
                      },
                      maxLength: {
                        value: 160,
                        message: 'Highlight must be maximum 160 characters.',
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        type='text'
                        placeholder='Example: Define the roles and responsibilities of a project manager'
                        variant='outlined'
                        error={!!error}
                        helperText={error ? error.message : null}
                        required
                        {...field}
                        className='w-full'
                      />
                    )}
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => highlightRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
          <Button
            label='Add more to your response'
            className='text-md normal-case rounded-none mt-5'
            startIcon={<AddIcon />}
            onClick={() => {
              highlightAppend({ points: '' });
            }}
          />
        </div>

        <div>
          <h3 className='font-medium'>
            What are the requirements or prerequisites for taking your course?
          </h3>
          <p className='my-2'>
            List the required skills, experience, tools or equipment learners
            should have prior to taking your course.
            <br />
            If there are no requirements, use this space as an opportunity to
            lower the barrier for beginners.
          </p>
          <ul>
            {prerequisiteFields.map((item, index) => {
              return (
                <li key={item.id} className='flex items-center gap-2'>
                  <Controller
                    name={`details.prerequisites.${index}.points`}
                    control={control}
                    rules={{
                      required: 'Prerequisite is required.',
                      minLength: {
                        value: 10,
                        message: 'Prerequisite must be at least 10 characters.',
                      },
                      maxLength: {
                        value: 160,
                        message: 'Prerequisite must be maximum 160 characters.',
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        type='text'
                        placeholder='Example: No programming experience needed. You will learn everything you need to know'
                        variant='outlined'
                        error={!!error}
                        helperText={error ? error.message : null}
                        required
                        {...field}
                        className='w-full'
                      />
                    )}
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => prerequisiteRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
          <Button
            label='Add more to your response'
            className='text-md normal-case rounded-none mt-5'
            startIcon={<AddIcon />}
            onClick={() => {
              prerequisiteAppend({ points: '' });
            }}
          />
        </div>

        <div>
          <h3 className='font-medium'>Who is this course for?</h3>
          <p className='my-2'>
            Write a clear description of the intended learners for your course
            who will find your course content valuable.
            <br />
            This will help you attract the right learners to your course.
          </p>
          <ul>
            {targetAudienceFields.map((item, index) => {
              return (
                <li key={item.id} className='flex items-center gap-2'>
                  <Controller
                    name={`details.targetAudience.${index}.points`}
                    control={control}
                    rules={{
                      required: 'This field is required.',
                      minLength: {
                        value: 10,
                        message: 'Must be at least 10 characters.',
                      },
                      maxLength: {
                        value: 160,
                        message: 'Must be maximum 160 characters.',
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        type='text'
                        placeholder='Example: Beginner Python developers curious about data science'
                        variant='outlined'
                        error={!!error}
                        helperText={error ? error.message : null}
                        required
                        {...field}
                        className='w-full'
                      />
                    )}
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => targetAudienceRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
          <Button
            label='Add more to your response'
            className='text-md normal-case rounded-none mt-5'
            startIcon={<AddIcon />}
            onClick={() => {
              targetAudienceAppend({ points: '' });
            }}
          />
        </div>
      </form>
    );
  };

  return (
    <MenuPageLayout
      title='Intended learners'
      handleSave={handleSubmit(onSubmit)}
      containerClass='flex flex-col gap-8'
    >
      <p>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </p>
      {renderForm()}
    </MenuPageLayout>
  );
};

export default IntendedLearners;
