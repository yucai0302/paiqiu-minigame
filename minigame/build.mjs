import { build, context } from 'esbuild';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const watch = process.argv.includes('--watch');
const serve = process.argv.includes('--serve');

const common = {
  bundle: true,
  format: 'iife',
  target: ['es2018'],
  platform: 'browser',
  legalComments: 'none',
  logLevel: 'info',
};

const configs = [
  {
    ...common,
    entryPoints: ['src/boot-wx.ts'],
    outfile: 'js/main.js',
    minify: !watch,
  },
  {
    ...common,
    entryPoints: ['src/boot-web.ts'],
    outfile: 'web/bundle.js',
    sourcemap: true,
    minify: false,
  },
];

if (watch) {
  for (const cfg of configs) {
    const ctx = await context(cfg);
    await ctx.watch();
  }
} else {
  for (const cfg of configs) await build(cfg);
}

if (serve) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
  };
  const root = process.cwd();
  createServer(async (req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p === '/') p = '/web/index.html';
    const file = normalize(join(root, p));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    try {
      const s = await stat(file);
      if (!s.isFile()) throw new Error('not a file');
      res.writeHead(200, {
        'Content-Type': types[extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  }).listen(5173, () => {
    process.stdout.write('web 调试地址: http://localhost:5173/web/\n');
  });
}
