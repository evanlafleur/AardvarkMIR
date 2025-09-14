import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getCachedGallery } from './scan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ---- Directories ----
const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, 'data', 'gallery');
// At runtime __dirname = <repo>/server/dist, so go up twice to <repo>, then into dist (client build)
const DIST_DIR = path.join(__dirname, '..', '..', 'dist');

// ------------------- GALLERY ROUTES -------------------

// Serve original gallery files (static passthrough)
app.use('/gallery', express.static(GALLERY_DIR));

// Optimized image endpoint (supports ?w=&h=&q=)
app.get('/gallery/*', async (req, res) => {
  // Avoid TS issue with req.params[0]; derive from the path instead
  const requested = decodeURIComponent(req.path.replace(/^\/gallery\//, '')); // e.g., "Olds Saxophone/before.jpg"
  const imagePath = path.join(GALLERY_DIR, requested);

  try {
    // Path traversal guard
    if (!imagePath.startsWith(GALLERY_DIR)) return res.status(403).send('Forbidden');

    if (!fs.existsSync(imagePath)) return res.status(404).send('Image not found');

    const width = req.query.w ? parseInt(req.query.w as string, 10) : undefined;
    const height = req.query.h ? parseInt(req.query.h as string, 10) : undefined;
    const quality = req.query.q ? parseInt(req.query.q as string, 10) : 80;

    const img = sharp(imagePath);
    if (width || height) {
      img.resize(width, height, { fit: 'inside', withoutEnlargement: true });
    }
    img.jpeg({ quality });

    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000');
    res.send(await img.toBuffer());
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(404).send('Image not found');
  }
});

// ------------------- API ROUTES -------------------

app.get('/api/gallery', (_req, res) => {
  try {
    res.json(getCachedGallery());
  } catch (error) {
    console.error('Gallery API error:', error);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ------------------- FRONTEND (React build) -------------------

// Serve static assets from the React dist folder
app.use(express.static(DIST_DIR));

// SPA fallback: send index.html for any non-API, non-gallery route
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/gallery')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// ------------------- START SERVER -------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Gallery API: http://localhost:${PORT}/api/gallery`);
  console.log(`Static gallery: http://localhost:${PORT}/gallery`);
  console.log(`Frontend served from: ${DIST_DIR}`);
});
