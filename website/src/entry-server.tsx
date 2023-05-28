import { RunServer } from '@resolid/nxt-run';
import { createHandler, processHelmet } from '@resolid/nxt-run/server';
import { createInstance } from 'i18next';
import FsBackend from 'i18next-fs-backend';
import isbot from 'isbot';
import { resolve } from 'node:path';
import { PassThrough, Readable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { i18n } from '~/i18n';

const ABORT_DELAY = 5000;

const getLocale = async (request: Request) => {
  return 'en';
};

export default createHandler(async (request, responseStatusCode, responseHeaders, entryContext, renderOptions) => {
  const ready = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  const instance = createInstance();
  const lng = await getLocale(request);
  const ns = entryContext.staticHandlerContext.matches
    ?.filter((m) => m.route.handle?.i18n !== undefined)
    .flatMap((m) => m.route.handle.i18n);

  await instance
    .use(initReactI18next)
    .use(FsBackend)
    .init({
      ...i18n,
      lng,
      ns: ['common', ...ns],
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RunServer context={entryContext} />
      </I18nextProvider>,
      {
        [ready]() {
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(Readable.toWeb(body) as unknown as ReadableStream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          body.write(
            processHelmet(renderOptions.startHtml.replace('<html lang="en">', `<html lang="${lng}">`), entryContext)
          );
          pipe(body);
          body.write(renderOptions.endHtml);
        },
        onShellError: reject,
        onError(error) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(() => abort(), ABORT_DELAY);
  });
});
