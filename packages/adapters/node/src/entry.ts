import { createHeaders, createRequest, getUrl, setResponse } from '@resolid/nxt-run/node';
import { readFileSync } from 'node:fs';
import { type IncomingMessage, type ServerResponse } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import polka from 'polka';
import sirv from 'sirv';

import 'dotenv/config';

// @ts-expect-error Cannot find module
import manifest from './route-manifest.json';
// @ts-expect-error Cannot find module
import handleRequest from './entry-server.js';

const { PORT = 3000 } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));

const assets = sirv(join(__dirname, '/public'), {
  setHeaders: (res, pathname) => {
    const isAsset = pathname.startsWith('/assets/');

    if (isAsset) {
      res.setHeader('cache-control', 'public, immutable, max-age=31536000');
    }
  },
});

const render = async (req: IncomingMessage, res: ServerResponse) => {
  const indexHtml = readFileSync(join(__dirname, 'public', 'template.html'), 'utf-8');
  const [startHtml, endHtml] = indexHtml.split('<!-- app -->');

  const url = getUrl(req);

  try {
    const response = await handleRequest(
      createRequest(url, req),
      createHeaders(res.getHeaders()),
      {
        manifest: manifest,
      },
      {
        startHtml,
        endHtml,
      },
    );

    await setResponse(res, response);
  } catch (err) {
    console.error(err);

    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';
    res.end();
  }
};

const server = polka().use('/', assets).use(render);

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
