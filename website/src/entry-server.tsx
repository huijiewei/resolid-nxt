import { RunServer } from '@resolid/nxt-run';
import { createHandler, processHelmet } from '@resolid/nxt-run/server';
import isbot from 'isbot';
import { PassThrough, Readable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 5000;

export default createHandler((request, responseStatusCode, responseHeaders, entryContext, renderOptions) => {
  const ready = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(<RunServer context={entryContext} />, {
      [ready]() {
        const body = new PassThrough();

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(Readable.toWeb(body) as unknown as ReadableStream, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode,
          })
        );

        body.write(processHelmet(renderOptions.startHtml, entryContext));
        pipe(body);
        body.write(renderOptions.endHtml);
      },
      onShellError: reject,
      onError(error) {
        didError = true;

        console.error(error);
      },
    });

    setTimeout(() => abort(), ABORT_DELAY);
  });
});
