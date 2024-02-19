import { gerVerificationTokenByEmail } from '@/data/verification';
import { v4 as uuid } from 'uuid';
import { db } from './db';
import { getPasswordTokenByEmail } from '@/data/password-reset-token';

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
