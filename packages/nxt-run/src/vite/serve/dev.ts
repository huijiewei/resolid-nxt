import { readFileSync } from 'node:fs';
import type { ViteDevServer } from 'vite';
import { createHeaders, createRequest, getUrl, setResponse } from '../../node';

export const dev = (viteServer: ViteDevServer) => {
  return () => {
    viteServer.middlewares.use(async (req, res) => {
      const url = getUrl(req);

      console.log(req.method, url.href);

      const indexHtml = await viteServer.transformIndexHtml(
        req.originalUrl ?? '/',
        readFileSync('./index.html', 'utf-8'),
      );
      const [startHtml, endHtml] = indexHtml.split('<!-- app -->');

      try {
        const handleRequest = (await viteServer.ssrLoadModule('~nxt-run/entry-server')).default;

        const response = await handleRequest(
          createRequest(url, req),
          res.statusCode,
          createHeaders(res.getHeaders()),
          {
            manifest: {},
          },
          { startHtml, endHtml },
        );

        await setResponse(res, response);
      } catch (e) {
        viteServer.ssrFixStacktrace(e as unknown as Error);
        console.log(e);
        res.statusCode = 500;
        res.end();
      }
    });
  };
};
