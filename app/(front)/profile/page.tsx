import { Metadata } from 'next';
import React from 'react';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./Form'));
const DefaultDetails = dynamic(() => import('./DefaultDetails'));

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = async () => {
  return (
    <div className='flex flex-row flex-wrap'>
      <Form />
      <DefaultDetails />
    </div>
  );
};

export default ProfilePage;
