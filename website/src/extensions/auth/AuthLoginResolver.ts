import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
});

export type AuthLoginFormData = z.infer<typeof schema>;

export const authLoginResolver = zodResolver(schema);
