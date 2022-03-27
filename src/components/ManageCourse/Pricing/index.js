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

import { updateCourse } from 'redux/slice/course';

const Pricing = ({ setIsPristine }) => {
  const dispatch = useDispatch();
  const {
    data,
    update: { loading },
  } = useSelector((state) => state.courses.course);

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      details: {
        pricing: 'Free',
        currency: 'INR',
        price: '',
      },
    },
  });

  const watchPricing = watch('details.pricing');

  useEffect(() => {
    setValue('details', {
      pricing: data?.pricing,
      currency: data?.currency,
      price: data?.price,
    });
  }, [data, setValue]);

  useEffect(() => {
    setIsPristine(!isDirty);
  }, [setIsPristine, isDirty]);

  const onSubmit = (formData) => {
    dispatch(
      updateCourse({
        ...formData.details,
        price:
          formData.details.pricing === 'Free' ? '' : formData.details?.price,
        _id: data._id,
      })
    );
    setIsPristine(true); // This should happen after the POST request is successful & should be changed in the future.
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
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
                  disabled
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        {watchPricing === 'Paid' && (
          <div className='flex items-center gap-5'>
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
                  containerClass='w-24'
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
        )}
      </form>
    );
  };

  return (
    <FormPageLayout
      title='Pricing'
      handleSave={handleSubmit(onSubmit)}
      loading={loading}
    >
      {renderForm()}
    </FormPageLayout>
  );
};

export default Pricing;
