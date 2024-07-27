import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import dbConnect from './dbConnect';
import UserModel from './models/UserModel';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();
        if (credentials === null) return null;

        const user = await UserModel.findOne({ email: credentials.email });
        console.log(user);
        if (!user) {
          console.log('joja ki laal');
          throw new Error('No user found with this email'); // Email not found error
        }
        const isMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isMatch) {
          console.log('joja ki laal');

          throw new Error('Incorrect password'); // Incorrect password error
        }
        return user;
      },
    }),
  ],
  // custom pages for sign in and register
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/error',
  },
  callbacks: {
    async jwt({ user, account, profile, token }: any) {
      if (user) {
        // If user signed in via Google
        if (account?.provider === 'google') {
          token.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            // Include additional Google data
            googleId: account.id,
            picture: profile?.picture,
            locale: profile?.locale,
            isVerified: profile?.email_verified,
          };
        } else {
          // If user signed in via credentials
          token.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
