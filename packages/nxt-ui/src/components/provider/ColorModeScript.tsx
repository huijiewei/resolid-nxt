import { COLOR_MODE_STORAGE_KEY } from './ColorModeProvider';

export const ColorModeScript = ({ nonce }: { nonce?: string }) => {
  return (
    <script
      id="nxt-color-mode-script"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `
try {
  var dark = localStorage.getItem('${COLOR_MODE_STORAGE_KEY}');
  if (dark ? dark == '"dark"' : matchMedia('(prefers-color-scheme:dark)').matches) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
      `,
      }}
    />
  );
};
