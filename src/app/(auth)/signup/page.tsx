import { Metadata } from 'next';

import { SignUpForm } from '@/features/auth/components/SignUpForm';

export const metadata: Metadata = {
  title: 'Next.js SignUp Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js SignUp Page TailAdmin Dashboard Template',
};
const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
