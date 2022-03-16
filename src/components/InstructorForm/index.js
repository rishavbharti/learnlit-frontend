import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
// Causes build errors
// import { stripHtml } from 'string-strip-html';

import Input from 'src/components/Input';
import RichTextEditor from 'src/components/RichTextEditor';
import FormPageLayout from 'src/components/FormPageLayout';
import { addInstructor } from 'redux/slice/instructor';

const InstructorForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.instructor);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      details: {
        name: '',
        headline: '',
        bio: '',
        email: '',
        social: {
          website: '',
          twitter: '',
          youtube: '',
          linkedin: '',
          facebook: '',
        },
      },
    },
  });

  const onSubmit = (data) => {
    dispatch(addInstructor(data.details));
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'>
          <Controller
            name='details.name'
            control={control}
            rules={{
              required: 'Name is required.',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters.',
              },
              maxLength: {
                value: 80,
                message: 'Name must be maximum 80 characters.',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Name'
                type='text'
                placeholder='Rishav Bharti'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />
          <Controller
            name='details.headline'
            control={control}
            rules={{
              required: 'Headline is required.',
              minLength: {
                value: 10,
                message: 'Headline must be at least 10 characters.',
              },
              maxLength: {
                value: 60,
                message: 'Headline must be maximum 60 characters.',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Headline'
                type='text'
                placeholder='Software Engineer at learnlit or Architect'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name='details.bio'
          control={control}
          defaultValue=''
          // rules={{
          //   validate: {
          //     required: (v) =>
          //       (v && stripHtml(v).result.length > 0) || 'Bio is required',
          //     maxLength: (v) =>
          //       (v && stripHtml(v).result.length <= 5000) ||
          //       'Maximum character limit is 5000',
          //   },
          // }}
          render={({ field, fieldState: { error } }) => {
            return (
              <RichTextEditor
                label='Bio'
                required
                {...field}
                error={!!error}
                helperText={error ? error.message : null}
              />
            );
          }}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'>
          <Controller
            name='details.email'
            control={control}
            rules={{
              required: 'Email is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Email'
                type='email'
                placeholder='name@company.com'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />
          <Controller
            name='details.social.website'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Website'
                type='url'
                placeholder='https://www.learnlit.in'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
          <Controller
            name='details.social.twitter'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Twitter'
                type='url'
                placeholder='https://twitter.com/learnlit_in'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
          <Controller
            name='details.social.youtube'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Youtube'
                type='url'
                placeholder='https://youtube.com/'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
          <Controller
            name='details.social.linkedin'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='LinkedIn'
                type='url'
                placeholder='https://linkedin.com/'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
          <Controller
            name='details.social.facebook'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Facebook'
                type='url'
                placeholder='https://facebook.com/'
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />
        </div>
      </form>
    );
  };

  return (
    <FormPageLayout
      title='Add new Instructor'
      handleSave={handleSubmit(onSubmit)}
      loading={loading}
    >
      {renderForm()}
    </FormPageLayout>
  );
};

export default InstructorForm;
