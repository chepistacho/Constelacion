import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = 'localhost';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function serveFile(req, res) {
  let parsedPath = req.url.split('?')[0];
  try {
    parsedPath = decodeURIComponent(parsedPath);
  } catch (e) {}

  if (parsedPath === '/' || parsedPath === '') {
    parsedPath = '/index.html';
  }

  const safePath = path.normalize(parsedPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // Búsqueda flexible para archivos de audio si no se encuentra exactamente
  if (!fs.existsSync(filePath) && path.extname(filePath).toLowerCase() === '.mp3') {
    const files = fs.readdirSync(__dirname);
    const mp3File = files.find(f => f.toLowerCase().endsWith('.mp3'));
    if (mp3File) {
      filePath = path.join(__dirname, mp3File);
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const totalSize = stats.size;

    // Soporte para HTTP Range requests (crucial para HTML <audio> y Web Audio API)
    const range = req.headers.range;
    if (range && ext === '.mp3') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });

      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': totalSize,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      }
      res.end('500 Internal Server Error');
    });
    stream.pipe(res);
  });
}

const server = http.createServer(serveFile);

function startServer(port) {
  server.listen(port, HOST, () => {
    const url = `http://${HOST}:${port}`;
    console.log('\n======================================================');
    console.log('🌌  CONSTELACIÓN — VJ TOOL (Servidor Local Node.js)');
    console.log('======================================================');
    console.log(`\n🚀  Servidor activo en: \x1b[36m${url}\x1b[0m\n`);
    console.log('🎹  Atajos de teclado disponibles:');
    console.log('    • [0] Intro               • [1] Enojado');
    console.log('    • [2] Reprimido           • [3] Decidido');
    console.log('    • [4] Cuidar al otro      • [5] Sol / Estribillo');
    console.log('    • [6] Tranquilo           • [7] Dos en sintonía');
    console.log('    • [8] Hacer daño          • [9] Volver a creer');
    console.log('    • [Q] Agradecimiento      • [W] Amarga realidad');
    console.log('    • [E] Alejarse            • [R] No puedo sin vos');
    console.log('    • [T] Outro');
    console.log('\n🔊  Haz click en la pantalla para activar el micrófono/audio.');
    console.log('⏹️   Presiona CTRL+C para detener el servidor.\n');

    // Intentar abrir el navegador automáticamente según la plataforma
    const startCmd = process.platform === 'win32' ? `start "" "${url}"`
      : process.platform === 'darwin' ? `open "${url}"`
      : `xdg-open "${url}"`;

    exec(startCmd, () => {
      // Si falla abrir automáticamente, no pasa nada
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Puerto ${port} en uso, intentando con ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('❌ Error en el servidor:', err);
    }
  });
}

startServer(PORT);
