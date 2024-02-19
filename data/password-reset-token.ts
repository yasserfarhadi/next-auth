import { db } from '@/lib/db';

export const getPasswordTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
