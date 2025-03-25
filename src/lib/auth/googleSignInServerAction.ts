'use server';

import { signIn } from '@/lib/auth/authConfig';

export const handleGoogleSignIn = async () => {
  try {
    await signIn('google', { redirectTo: '/dashboard/events' });
  } catch (error) {
    throw error;
  }
};
