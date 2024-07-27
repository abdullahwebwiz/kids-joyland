import { Metadata } from 'next';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./Form'));

export const metadata: Metadata = {
  title: 'Sign in',
};

const SignInPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default SignInPage;
