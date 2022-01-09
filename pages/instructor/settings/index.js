import React from 'react';

import withAuth from 'src/components/HOC/withAuth';

import InstructorPageLayout from 'src/components/InstructorPageLayout';

const Settings = () => {
  return <InstructorPageLayout>Settings</InstructorPageLayout>;
};

export default withAuth(Settings);
