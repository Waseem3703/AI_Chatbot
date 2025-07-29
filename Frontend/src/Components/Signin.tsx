import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Signin() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
export default Signin;