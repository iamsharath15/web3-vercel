'use server';

import { signOut } from '@/lib/auth/authConfig';

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};
