import { once } from 'node:events';
import type { IncomingHttpHeaders, IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import { splitCookiesString } from 'set-cookie-parser';

export const getUrl = (req: IncomingMessage) => {
  const origin = req.headers.origin || `http://${req.headers.host}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new URL((req as any).originalUrl || req.url || '/', origin);
};

export const createRequest = (url: URL, req: IncomingMessage) => {
  const body =
    req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : req.socket
      ? (req as unknown as ReadableStream)
      : new ReadableStream({
          start(controller) {
            req.on('data', (chunk) => controller.enqueue(chunk));
            req.on('end', () => controller.close());
            req.on('error', (err) => controller.error(err));
          },
        });

  return new Request(url.href, {
    method: req.method,
    headers: createHeaders(req.headers),
    body,
    // @ts-expect-error Argument of type
    duplex: 'half',
  });
};

export const createHeaders = (outgoingHeaders: OutgoingHttpHeaders | IncomingHttpHeaders) => {
  const headers = new Headers();

  for (const [key, values] of Object.entries(outgoingHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values.toString());
      }
    }
  }

  return headers;
};

export const setResponse = async (res: ServerResponse, response: Response) => {
  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  for (const [name, value] of response.headers) {
    if (name == 'set-cookie') {
      res.setHeader(name, splitCookiesString(value));
    } else {
      res.setHeader(name, value);
    }
  }

  if (!response.body) {
    res.end();
    return;
  }

  const readable = Readable.from(response.body as never);
  readable.pipe(res);

  await once(readable, 'end');
};
