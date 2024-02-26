import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(40),
  name: z.string().min(3),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6).max(40),
});
