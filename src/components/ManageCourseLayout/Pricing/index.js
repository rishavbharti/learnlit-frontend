import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Input from 'src/components/Input';
import DropdownInput from 'src/components/DropdownInput';

import MenuPageLayout from '../MenuPageLayout';

const Pricing = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      details: {},
    },
  });

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
        <p>
          How do you intend to offer your course? Select the monetization
          option.
        </p>
        <RadioGroup row aria-label='pricing' name='row-radio-buttons-group'>
          <FormControlLabel value='free' control={<Radio />} label='Free' />
          <FormControlLabel value='paid' control={<Radio />} label='Paid' />
        </RadioGroup>
      </form>
    );
  };

  return (
    <MenuPageLayout title='Pricing' handleSave={handleSubmit(onSubmit)}>
      {renderForm()}
    </MenuPageLayout>
  );
};

export default Pricing;
