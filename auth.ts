import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './data/user';
import 'next-auth/jwt';

const roles = ['ADMIN', 'USER'] as const;
type Roles = (typeof roles)[number];
declare module 'next-auth' {
  interface User {
    /** The user's role. */
    role?: Roles;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role?: Roles;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (user.id) {
    //     const existingUser = await getUserById(user.id);
    //     if (!existingUser || !existingUser.emailVerified) {
    //       false;
    //     }
    //   }
    //   return false;
    // },
    async signIn({ user, account }) {
      // allow OAuth withoud email varification
      if (account?.provider !== 'credentials') return true;
      if (user.id) {
        const existingUser = await getUserById(user.id);

        //prevent signin without email verification
        if (!existingUser?.emailVerified) return false;

        // Add 2fa check
      }

      return true;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (user) token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        if (roles.includes(token.role)) {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
