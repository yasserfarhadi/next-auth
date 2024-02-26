import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  return await resend.emails.send({
    from: 'BBK <onboarding@resend.dev>',
    to: [email],
    subject: '2FA Code',
    html: `<p>Your 2FA Code: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  return await resend.emails.send({
    from: 'BBK <onboarding@resend.dev>',
    to: [email],
    subject: 'Confirm your email',
    html: `<p>to confirm your email click <a href="${confirmLink}">here</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  return await resend.emails.send({
    from: 'BBK <onboarding@resend.dev>',
    to: [email],
    subject: 'Reset your password',
    html: `<p>to reset your password click <a href="${resetLink}">here</a></p>`,
  });
};
