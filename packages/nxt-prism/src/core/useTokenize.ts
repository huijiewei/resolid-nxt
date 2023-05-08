import { useMemo, useRef } from 'react';
import type { Language, PrismGrammar, PrismLib, PrismToken } from '../lib/types';
import { normalizeTokens } from '../utils/normalizeTokens';

type Options = {
  prism: PrismLib;
  code: string;
  grammar?: PrismGrammar;
  language: Language;
};

export const useTokenize = ({ prism, code, grammar, language }: Options) => {
  const prismRef = useRef(prism);

  return useMemo(() => {
    if (grammar == null) {
      return normalizeTokens([code]);
    }

    const env = {
      code,
      grammar,
      language,
      tokens: [] as (PrismToken | string)[],
    };

    prismRef.current.hooks.run('before-tokenize', env);
    env.tokens = prismRef.current.tokenize(code, grammar);
    prismRef.current.hooks.run('after-tokenize', env);

    return normalizeTokens(env.tokens);
  }, [code, grammar, language]);
};
