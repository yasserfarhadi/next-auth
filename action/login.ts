'use server';

import { signIn } from '@/auth';
import { getTwoFactorTokenByEmail } from '@/data/tow-factor-token';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schema';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid Fields' };

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: 'Invalid Credentials',
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: 'Confirmation email sent!',
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: 'Invalid Code' };
      if (twoFactorToken.token !== code) return { error: 'Invalid Code' };
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: 'Code expired' };

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { towFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return {
            error: 'Something Went Wrong',
          };
      }
    }
    throw error;
  }
};
