import { redirect } from 'next/navigation';
import SignInPage from './SignInPage';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';

const SignIn: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect('/dashboard/events');
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
