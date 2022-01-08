import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Input from 'src/components/Input';
import DropdownInput from 'src/components/DropdownInput';

import FormPageLayout from 'src/components/FormPageLayout';

const Pricing = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      details: {
        pricing: 'Free',
        currency: 'INR',
        price: '',
      },
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
        <FormControl component='fieldset'>
          <Controller
            rules={{ required: true }}
            control={control}
            name='details.pricing'
            render={({ field }) => (
              <RadioGroup {...field} row defaultValue='Free' name='pricing'>
                <FormControlLabel
                  value='Free'
                  control={<Radio />}
                  label='Free'
                />
                <FormControlLabel
                  value='Paid'
                  control={<Radio />}
                  label='Paid'
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <div className='flex gap-5'>
          <Controller
            name='details.currency'
            control={control}
            rules={{
              required: 'Currency is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <DropdownInput
                data={['INR', 'USD']}
                error={!!error}
                helperText={error ? error.message : null}
                value={field.value}
                handleChange={field.onChange}
                valueExtractor={(datum) => datum}
                labelExtractor={(datum) => datum}
                containerClass='w-24 mt-3'
              />
            )}
          />
          <Controller
            name='details.price'
            control={control}
            rules={{
              required: 'Price is required.',
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Price'
                type='number'
                placeholder='699'
                error={!!error}
                helperText={error ? error.message : null}
                required
                {...field}
              />
            )}
          />
        </div>
      </form>
    );
  };

  return (
    <FormPageLayout title='Pricing' handleSave={handleSubmit(onSubmit)}>
      {renderForm()}
    </FormPageLayout>
  );
};

export default Pricing;
