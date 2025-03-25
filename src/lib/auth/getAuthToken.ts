import { auth } from '@/lib/auth/authConfig';

interface CustomUser {
  access_token: string;
}

export const getAuthToken = async (): Promise<string> => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized: No session found');
  }

  const user = session.user as CustomUser | undefined;
  if (!user || !user.access_token) {
    throw new Error('Unauthorized: Missing access token');
  }

  return user.access_token;
};
