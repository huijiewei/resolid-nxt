/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
