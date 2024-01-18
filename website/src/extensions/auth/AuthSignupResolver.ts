import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().min(1).email(),
    username: z.string().min(3).max(15),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    agreeTerms: z.literal<boolean>(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    params: {
      i18n: 'not_match',
    },
  });

export type AuthSignupFormData = z.infer<typeof schema>;

export const authSignupResolver = zodResolver(schema);
