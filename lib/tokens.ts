import { gerVerificationTokenByEmail } from '@/data/verification';
import { v4 as uuid } from 'uuid';
import { db } from './db';
import { getPasswordTokenByEmail } from '@/data/password-reset-token';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from '@/data/tow-factor-token';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // Todo: later change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 10000);

  const existingToken = await getPasswordTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  const passwordResetToken = db.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 10000);

  const existingToken = await gerVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
