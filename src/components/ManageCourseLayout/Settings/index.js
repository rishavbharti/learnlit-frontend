import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Switch from '@mui/material/Switch';

import Input from 'src/components/Input';
import DropdownInput from 'src/components/DropdownInput';

import FormPageLayout from 'src/components/FormPageLayout';
import { getAddedInstructors } from 'redux/slice/instructor';

const Settings = () => {
  const dispatch = useDispatch();
  const { loading, instructors } = useSelector((state) => state.instructor);

  useEffect(() => {
    if (!instructors.length) {
      dispatch(getAddedInstructors());
    }
  }, [dispatch, instructors]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      details: {
        instructors: '',
        duration: '',
        hidePlayerBranding: true,
        published: false,
      },
    },
  });

  const onSubmit = (data) => {
    console.log('data ', data);
  };

  const renderField = (label, Component) => {
    return (
      <div className='grid md:grid-cols-2 items-center'>
        <p className='text-labelText mb-1 md:mb-0'>{label}</p>
        {Component}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(e) => e.preventDefault()}
        className='flex flex-col gap-8'
      >
        {renderField(
          'Instructor',
          <Controller
            name='details.instructors'
            control={control}
            rules={{
              required: 'This field is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <DropdownInput
                data={instructors}
                loading={loading}
                error={!!error}
                helperText={error ? error.message : null}
                value={field.value}
                handleChange={field.onChange}
                valueExtractor={(i) => i._id}
                labelExtractor={(i) => i.name}
              />
            )}
          />
        )}

        {renderField(
          'Total course duration',
          <Controller
            name='details.duration'
            control={control}
            rules={{
              required: 'This field is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Duration'
                type='time'
                inputProps={{ step: 2 }}
                placeholder='duration'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
        )}

        {renderField(
          'Do you wish to hide branding on the embedded player?',
          <Controller
            name='details.hidePlayerBranding'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} />
            )}
          />
        )}

        {renderField(
          'Course status',
          <Controller
            name='details.published'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-1'>
                <p>Unpublished</p>
                <Switch checked={field.value} onChange={field.onChange} />
                <p>Published</p>
              </div>
            )}
          />
        )}
      </form>
    );
  };

  return (
    <FormPageLayout title='Settings' handleSave={handleSubmit(onSubmit)}>
      {renderForm()}
    </FormPageLayout>
  );
};

export default Settings;
