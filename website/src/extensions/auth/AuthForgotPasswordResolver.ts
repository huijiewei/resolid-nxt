import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1).email(),
  token: z.string().min(1),
});

export type AuthForgotPasswordFormData = z.infer<typeof schema>;

export const authForgotPasswordResolver = zodResolver(schema);
