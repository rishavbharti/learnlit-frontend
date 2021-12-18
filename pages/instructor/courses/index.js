import React from 'react';
import { useDispatch } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';

import Button from 'src/components/Button';
import InstructorPageLayout from 'src/components/InstructorPageLayout';
import { openDialog } from 'redux/slice/dialog';
import CreateCourseDialog from './component/CreateCourseDialog';

const Courses = () => {
  const dispatch = useDispatch();

  const handleCreateCourseClick = () => {
    dispatch(openDialog());
  };

  return (
    <InstructorPageLayout>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-medium'>Courses</h1>
        <Button
          label='Create Course'
          variant='contained'
          className='bg-primary normal-case'
          startIcon={<AddIcon />}
          onClick={handleCreateCourseClick}
        />
      </div>
      <CreateCourseDialog />
    </InstructorPageLayout>
  );
};

export default Courses;
