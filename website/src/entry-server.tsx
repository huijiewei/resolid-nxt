import { RunServer } from '@resolid/nxt-run';
import { createHandler, processHelmet } from '@resolid/nxt-run/server';
import isbot from 'isbot';
import { PassThrough, Readable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '~/i18n';
import { getInstance } from '~/i18n.server';

const ABORT_DELAY = 5000;

export default createHandler(async (request, responseStatusCode, responseHeaders, entryContext, renderOptions) => {
  const ready = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  const lng =
    entryContext.staticHandlerContext.matches.find((m) => m.params.lang != undefined)?.params.lang ??
    (i18n.fallbackLng as string);
  const ns = entryContext.staticHandlerContext.matches
    .filter((m) => m.route.handle?.i18n != undefined)
    .flatMap((m) => m.route.handle.i18n);

  const instance = await getInstance(lng, ns);

  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RunServer context={entryContext} />
      </I18nextProvider>,
      {
        [ready]() {
          shellRendered = true;

          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(Readable.toWeb(body) as unknown as ReadableStream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          body.write(
            processHelmet(
              renderOptions.startHtml.replace('<html lang="en">', `<html lang="${lng}"  dir="${instance.dir()}">`),
              entryContext
            )
          );
          pipe(body);
          body.write(renderOptions.endHtml);
        },
        onShellError: reject,
        onError(error) {
          responseStatusCode = 500;

          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(() => abort(), ABORT_DELAY);
  });
});
