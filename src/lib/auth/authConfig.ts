import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

interface CustomUser {
  id: string;
  name: string;
  email: string;
  profileImg: string | null;
  accountType: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Email and OTP',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        otp: { label: 'OTP', type: 'text', placeholder: 'Enter OTP' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Missing credentials');

        const { email, otp } = credentials;

        // OTP Verification
        if (otp) {
          try {
            const response = await fetch(
              `${process.env.API_END_POINT}/api/v1/auth/otp/verify`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, authType: 'otp', authKey: otp }),
              }
            );

            const data = await response.json();
            if (data.status === 200) {
              return data.data as CustomUser; // Successful verification returns user data
            } else {
              throw new Error(data.message || 'Failed to verify OTP');
            }
          } catch (error) {
            console.error('Error during OTP verification:', error);
            throw new Error('Failed to login with email and OTP');
          }
        }

        // OTP Generation
        try {
          const response = await fetch(
            `${process.env.API_END_POINT}/api/v1/auth/otp`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            }
          );

          const data = await response.json();
          if (data.status === 200) {
            return null; // No user data to return; OTP generation is complete
          } else {
            throw new Error(data.message || 'Failed to send OTP');
          }
        } catch (error) {
          console.error('Error generating OTP:', error);
          throw new Error('Failed to send OTP');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Check if `id_token` is available in the account object
      if (account?.id_token) {
        try {
          // Make a POST request to your backend
          const response = await fetch(
            `${process.env.API_END_POINT}/api/v1/auth/google`,
            {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                authKey: account.id_token,
                authType: 'google',
              }),
            }
          );

          // Parse the response
          const data = await response.json();

          // Handle the response
          if (data.status === 200) {
            // Store the backend data in the token
            (account as any).metadata = data.data;
            return true;
          } else {
            console.error('Authentication failed:', data.message);
            return false;
          }
        } catch (error) {
          console.error('Error authenticating user:', error);
          return false;
        }
      }

      // Allow sign-in by default if no id_token
      return true;
    },

    async jwt({ token, account, user }) {
      if (account?.metadata) {
        token.userData = account.metadata;
      }
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      if (token.userData) {
        session.user = { ...session.user, ...(token.userData as any) };
      } else if (token.user) {
        session.user = { ...session.user, ...(token.user as any) };
      }
      console.log("**********", session)

      return session;
    },
  },
});
