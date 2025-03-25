'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleLogin from './GoogleLogin';
import EmailLogin from './EmailLogin';

const SignInPage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center flex-col signin-bg-shadow items-center">
      <div className="w-11/12 lg:w-4/12 md:w-6/12 ">
        <Card className="bg-[#30303099] border-none flex flex-col w-full rounded-3xl p-4">
          <CardHeader className="flex items-center justify-center py-12">
            <CardTitle className="text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailLogin />
          </CardContent>
          <div className="flex w-full items-center justify-center py-1 px-6">
            <div className="w-full h-[1px] bg-[#ffffff54] my-[2%]"></div>
     
          </div>
          <CardFooter className="flex justify-between flex-col">
            <GoogleLogin />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
