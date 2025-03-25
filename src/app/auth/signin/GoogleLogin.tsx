'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { handleGoogleSignIn } from '@/lib/auth/googleSignInServerAction';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="w-full signin-button-gradient-google border-none text-white "
      variant="outline"
      onClick={() => startTransition(handleGoogleSignIn)}
      disabled={isPending}
    >
      <FcGoogle className="mr-2" />
      {isPending ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleLogin;
