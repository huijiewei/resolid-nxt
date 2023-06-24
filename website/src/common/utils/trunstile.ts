import * as process from 'process';

type TokenValidateResponse = {
  'error-codes': string[];
  success: boolean;
  action: string;
  cdata: string;
};

export const verifyToken = async (token: string) => {
  console.log(token);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      response: token,
      secret: process.env.NXT_TURNSTILE_SECRET,
    }),
  });

  const data: TokenValidateResponse = await response.json();

  return {
    success: data.success,
    error: data['error-codes']?.length ? data['error-codes'][0] : null,
  };
};
