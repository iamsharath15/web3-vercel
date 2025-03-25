'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

type FormData = {
  email: string;
  otp?: string;
};

const EmailLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Handle OTP Generation
  const onSubmitEmail: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
      });

      if (result?.ok) {
        setEmail(data.email);
        setOtpSent(true);
      } else {
        console.error('Error sending OTP:', result?.error);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const onSubmitOTP: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        otp: data.otp,
      });

      if (result?.ok) {
        window.location.href = '/dashboard/events';
      } else {
        console.error('Error verifying OTP:', result?.error);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(otpSent ? onSubmitOTP : onSubmitEmail)}>
        <div className="grid w-full items-center gap-4">
          {/* Email Input */}
          {!otpSent && (
            <div className="flex flex-col space-y-1.5">
              <Input
                className="bg-white/10 border-none text-white placeholder:text-white"
                id="email"
                placeholder="Enter Your Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

          {/* OTP Input */}
          {otpSent && (
            <div className="flex flex-col space-y-1.5">
              <Input
                className="bg-white/10 border-none text-white placeholder:text-white"
                id="otp"
                placeholder="Enter OTP"
                {...register('otp', { required: 'OTP is required' })}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full mt-4  bg-transparent rounded-full signin-button-gradient hover:text-white "
          type="submit"
          variant="outline"
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : otpSent
            ? 'Verify OTP'
            : 'Continue with Email'}
        </Button>
      </form>
    </>
  );
};

export default EmailLogin;
