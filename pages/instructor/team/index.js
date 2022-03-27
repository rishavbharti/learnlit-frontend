import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

import withAuth from 'src/components/HOC/withAuth';

import Button from 'src/components/Button';
import InstructorPageLayout from 'src/components/InstructorPageLayout';
import CenterAligned from 'src/components/CenterAligned';
import InstructorTable from 'src/components/InstructorTable';

import { getAddedInstructors } from 'redux/slice/instructor';

import TeamLogo from 'public/assets/team.svg';

const Team = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, instructors } = useSelector(
    (state) => state.instructor
  );

  useEffect(() => {
    dispatch(getAddedInstructors());
  }, [dispatch]);

  const renderTeam = () => {
    return <InstructorTable data={instructors} />;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <CenterAligned>
          <CircularProgress />
        </CenterAligned>
      );
    }

    if (error) {
      return (
        <CenterAligned>
          <p>Some error occurred while fetching instructors.</p>
        </CenterAligned>
      );
    }

    if (!instructors.length) {
      return (
        <CenterAligned>
          <Image src={TeamLogo} alt='Team' width='600' height='350' />
          <p className='text-center font-bold text-lg py-10'>
            You have not added any istructors to your team yet.
            <br /> Start by adding one.
          </p>
        </CenterAligned>
      );
    }

    return renderTeam();
  };

  return (
    <InstructorPageLayout>
      <div className='flex justify-between mb-5'>
        <h1 className='text-2xl font-medium'>Team</h1>
        <Button
          label='Add Instructor'
          startIcon={<AddIcon />}
          onClick={() => router.push('/instructor/team/add')}
        />
      </div>
      {renderContent()}
    </InstructorPageLayout>
  );
};

export default withAuth(Team);
