import { PassThrough, Readable } from 'node:stream';
import { type RunContextValue, RunServer } from '@resolid/nxt-run';
import { createHandler, processHelmet } from '@resolid/nxt-run/server';
import { renderToPipeableStream } from 'react-dom/server';
import isbot from 'isbot';

const ABORT_DELAY = 5000;

export default createHandler(
  (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    runContext: RunContextValue,
    renderOptions
  ) => {
    const ready = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

    return new Promise((resolve, reject) => {
      let didError = false;

      const { pipe, abort } = renderToPipeableStream(<RunServer context={runContext} />, {
        [ready]() {
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(Readable.toWeb(body) as unknown as ReadableStream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          body.write(processHelmet(renderOptions.startHtml, runContext.helmetContext?.helmet));
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
  }
);
