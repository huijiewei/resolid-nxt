import type { ViteDevServer } from 'vite';
import { createHeaders, createRequest, setResponse } from '../../node';
import { readFileSync } from 'node:fs';

export const dev = (viteServer: ViteDevServer) => {
  return () => {
    viteServer.middlewares.use(async (req, res) => {
      console.log(req.method, new URL(req.url ?? '', viteServer.resolvedUrls?.local[0]).href);

      const html = readFileSync('./index.html', 'utf-8');
      const transformedHtml = await viteServer.transformIndexHtml(req.url ?? '', html, req.originalUrl);
      const [startHtml, endHtml] = transformedHtml.split('<!-- app -->');

      try {
        const handleRequest = (await viteServer.ssrLoadModule('~nxt-run/entry-server')).default;

        const response = await handleRequest(
          createRequest(req),
          res.statusCode,
          createHeaders(res.getHeaders()),
          {
            manifest: {},
            helmetContext: {},
          },
          { startHtml, endHtml }
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
