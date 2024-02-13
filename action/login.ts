'use server';

import { LoginSchema } from '@/schema';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid Fields' };

  return {
    success: 'Email send!',
  };
};
