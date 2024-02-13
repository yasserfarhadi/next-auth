'use server';

import { RegisterSchema } from '@/schema';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid Fields' };

  return {
    success: 'Email send!',
  };
};
