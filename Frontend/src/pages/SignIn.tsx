import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='mx-auto'>
        <SignIn />
      </div>
    </div>
  );
}
export default SignInPage;
