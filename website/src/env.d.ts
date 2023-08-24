/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NXT_DB_HOST: string;
      NXT_DB_PORT: number;
      NXT_DB_USER: string;
      NXT_DB_PASSWORD: string;
      NXT_DB_DATABASE: string;
      NXT_TURNSTILE_SECRET: string;
    }
  }
}
