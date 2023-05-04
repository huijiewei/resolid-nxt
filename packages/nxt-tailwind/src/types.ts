import { borderRadius } from './tokens/border-radius';

export type BorderRadius = Exclude<keyof typeof borderRadius, 'DEFAULT' | 'none'>;
