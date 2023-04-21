import { DemoExample } from '~/modules/ui/components/DemoExample';

export const FontFamily = () => {
  return (
    <DemoExample
      preview={() => (
        <section className={'flex flex-col gap-3 text-lg'}>
          <p className="font-sans">The quick brown fox jumps over the lazy dog.</p>
          <p className="font-serif">The quick brown fox jumps over the lazy dog.</p>
          <p className="font-mono">The quick brown fox jumps over the lazy dog.</p>
        </section>
      )}
      snippet={`<section className={'flex flex-col gap-3 text-lg'}>
  <p className="font-sans">The quick brown fox jumps over the lazy dog.</p>
  <p className="font-serif">The quick brown fox jumps over the lazy dog.</p>
  <p className="font-mono">The quick brown fox jumps over the lazy dog.</p>
</section>`}
    />
  );
};

export const FontSize = () => {
  return (
    <DemoExample
      preview={() => (
        <section className={'flex flex-col gap-3'}>
          <p className="text-xs">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-base">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-xl">The quick brown fox jumps over the lazy dog. </p>
        </section>
      )}
      snippet={`<section className={'flex flex-col gap-3'}>
  <p className="text-xs">The quick brown fox jumps over the lazy dog.</p>
  <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
  <p className="text-base">The quick brown fox jumps over the lazy dog.</p>
  <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
  <p className="text-xl">The quick brown fox jumps over the lazy dog. </p>
</section>`}
    />
  );
};

export const FontWidth = () => {
  return (
    <DemoExample
      preview={() => (
        <section className={'flex flex-col gap-3 text-lg'}>
          <p className="font-light">The quick brown fox jumps over the lazy dog.</p>
          <p className="font-normal">The quick brown fox jumps over the lazy dog.</p>
          <p className="font-medium">The quick brown fox jumps over the lazy dog.</p>
          <p className="font-bold">The quick brown fox jumps over the lazy dog.</p>
        </section>
      )}
      snippet={`<section className={'flex flex-col gap-3 text-lg'}>
  <p className="font-light">The quick brown fox jumps over the lazy dog.</p>
  <p className="font-normal">The quick brown fox jumps over the lazy dog.</p>
  <p className="font-medium">The quick brown fox jumps over the lazy dog.</p>
  <p className="font-bold">The quick brown fox jumps over the lazy dog.</p>
</section>`}
    />
  );
};

export const FontStyle = () => {
  return (
    <DemoExample
      preview={() => (
        <section className={'flex flex-col gap-3 text-lg'}>
          <p className="italic">The quick brown fox jumps over the lazy dog.</p>
          <p className="not-italic">The quick brown fox jumps over the lazy dog.</p>
        </section>
      )}
      snippet={`<section className={'flex flex-col gap-3 text-lg'}>
  <p className="italic">The quick brown fox jumps over the lazy dog.</p>
  <p className="not-italic">The quick brown fox jumps over the lazy dog.</p>
</section>`}
    />
  );
};

export const TextDecoration = () => {
  return (
    <DemoExample
      preview={() => (
        <section className={'flex flex-col gap-3 text-lg'}>
          <p className="underline">The quick brown fox jumps over the lazy dog.</p>
          <p className="overline">The quick brown fox jumps over the lazy dog.</p>
          <p className="line-through">The quick brown fox jumps over the lazy dog.</p>
          <p className="no-underline">The quick brown fox jumps over the lazy dog.</p>
        </section>
      )}
      snippet={`<section className={'flex flex-col gap-3 text-lg'}>
  <p className="underline">The quick brown fox jumps over the lazy dog.</p>
  <p className="overline">The quick brown fox jumps over the lazy dog.</p>
  <p className="line-through">The quick brown fox jumps over the lazy dog.</p>
  <p className="no-underline">The quick brown fox jumps over the lazy dog.</p>
</section>`}
    />
  );
};
