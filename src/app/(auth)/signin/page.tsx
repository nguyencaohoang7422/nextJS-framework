import { Metadata } from 'next';

import { SignInForm } from '@/features/auth/components/SignInForm';

export const metadata: Metadata = {
  title: 'SignIn Page',
  description: 'Signin Page',
};
const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
