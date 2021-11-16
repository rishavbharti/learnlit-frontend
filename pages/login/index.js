import React from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';

import Input from 'src/components/Input';
import Button from 'src/components/Button';

import { login } from 'redux/slice/auth';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='w-9/12 md:w-1/2 lg:w-1/3 px-8 pt-12 pb-16 border-2 border-solid border-primary border-opacity-25 rounded-lg shadow-xl'>
        <Image
          src='/assets/learnlit.svg'
          alt='learnlit'
          width='200'
          height='70'
        />
        <h2 className='text-2xl my-1.5 ml-1'>Login</h2>
        {errorMessage && (
          <Alert severity='error' className='mb-2'>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Email'
                type='email'
                placeholder='Email'
                variant='filled'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 6,
                message: 'Your password must be at least 6 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your password must be maximum 20 characters.',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Password'
                type='password'
                placeholder='Password'
                variant='filled'
                required
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />

          <Button
            label='Sign In'
            type='submit'
            variant='contained'
            className='mt-5'
            loading={status === 'loading'}
          />
        </form>
      </div>
    </div>
  );
}
