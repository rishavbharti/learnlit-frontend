import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'src/components/Input';
import RichTextEditor from 'src/components/RichTextEditor';
import DropdownInput from 'src/components/DropdownInput';

import { getCategories } from 'redux/slice/courseCategories';

import { languages } from 'src/data/languages';
import MenuPageLayout from '../MenuPageLayout';

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.courseCategories);
  const [category, setCategory] = useState('');
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      details: {
        title: '',
        subtitle: '',
        description: '',
        language: '',
        level: '',
        category: '',
        subCategory: '',
      },
    },
  });

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    const subCategory =
      categories && category
        ? categories.find((item) => item.title === category).subCategories
        : [];

    setSubCategoriesList(subCategory);
  }, [category, categories]);

  const onSubmit = (data) => {
    console.log('data ', data);
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(e) => e.preventDefault()}
        className='flex flex-col gap-5'
      >
        <Controller
          name='details.title'
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
        <Controller
          name='details.subtitle'
          control={control}
          rules={{
            required: 'Subtitle is required.',
            minLength: {
              value: 3,
              message: 'Subtitle must be at least 10 characters.',
            },
            maxLength: {
              value: 80,
              message: 'Subtitle must be maximum 120 characters.',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              label='Subtitle'
              type='text'
              placeholder='Subtitle'
              error={!!error}
              helperText={error ? error.message : null}
              required
              {...field}
              className='w-full'
            />
          )}
        />
        <Controller
          name='details.description'
          control={control}
          defaultValue=''
          rules={{
            validate: {
              required: (v) =>
                (v && stripHtml(v).result.length > 0) ||
                'Description is required',
              maxLength: (v) =>
                (v && stripHtml(v).result.length <= 5000) ||
                'Maximum character limit is 5000',
            },
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <RichTextEditor
                label='Description'
                required
                {...field}
                error={!!error}
                helperText={error ? error.message : null}
              />
            );
          }}
        />
        <div>
          <h3 className='text-labelText mb-1'>Basic info</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            <Controller
              name='details.language'
              control={control}
              rules={{
                required: 'Language is required.',
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DropdownInput
                    label='Language'
                    data={languages}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    value={field.value}
                    handleChange={field.onChange}
                    valueExtractor={(datum) => datum.name}
                    labelExtractor={(datum) => datum.nativeName}
                  />
                );
              }}
            />
            <Controller
              name='details.level'
              control={control}
              rules={{
                required: 'Level is required.',
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DropdownInput
                    label='Level'
                    data={['Beginner', 'Intermediate', 'Expert', 'All Levels']}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    value={field.value}
                    handleChange={field.onChange}
                    valueExtractor={(datum) => datum}
                    labelExtractor={(datum) => datum}
                  />
                );
              }}
            />
            <Controller
              name='details.category'
              control={control}
              rules={{
                required: 'Category is required.',
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DropdownInput
                    label='Category'
                    data={categories}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    value={field.value}
                    handleChange={(e) => {
                      setCategory(e.target.value);
                      return field.onChange(e);
                    }}
                    valueExtractor={(datum) => datum.title}
                    labelExtractor={(datum) => datum.title}
                  />
                );
              }}
            />
            <Controller
              name='details.subCategory'
              control={control}
              rules={{
                required: 'Subcategory is required.',
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DropdownInput
                    label='Subcategory'
                    data={subCategoriesList}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    value={field.value}
                    handleChange={field.onChange}
                    valueExtractor={(datum) => datum.title}
                    labelExtractor={(datum) => datum.title}
                  />
                );
              }}
            />
          </div>
        </div>
      </form>
    );
  };

  return (
    <MenuPageLayout title='Course Details' handleSave={handleSubmit(onSubmit)}>
      {renderForm()}
    </MenuPageLayout>
  );
};

export default CourseDetails;
