import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getCachedGallery } from './scan';
import { fileURLToPath } from 'url';

// ---- paths ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');                     // <-- Vite output
const GALLERY_DIR = path.join(ROOT, 'data', 'gallery');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve raw original files (optional) from data/gallery
app.use('/gallery', express.static(GALLERY_DIR));

// Image optimization endpoint (resizing via ?w=&h=&q=)
app.get('/gallery/*', async (req, res) => {
  const requested = req.params[0] as string;
  const imagePath = path.join(GALLERY_DIR, requested);

  try {
    // basic path traversal guard
    if (!imagePath.startsWith(GALLERY_DIR)) {
      return res.status(403).send('Forbidden');
    }

    if (!fs.existsSync(imagePath)) {
      return res.status(404).send('Image not found');
    }

    const sharpInstance = sharp(imagePath);

    const width = req.query.w ? parseInt(req.query.w as string, 10) : undefined;
    const height = req.query.h ? parseInt(req.query.h as string, 10) : undefined;
    const quality = req.query.q ? parseInt(req.query.q as string, 10) : 80;

    if (width || height) {
      sharpInstance.resize(width, height, { fit: 'inside', withoutEnlargement: true });
    }

    sharpInstance.jpeg({ quality });

    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000');

    const buffer = await sharpInstance.toBuffer();
    res.send(buffer);
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(404).send('Image not found');
  }
});

// API endpoint for gallery data
app.get('/api/gallery', (_req, res) => {
  try {
    const gallery = getCachedGallery();
    res.json(gallery);
  } catch (error) {
    console.error('Gallery API error:', error);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * ----- Serve the React app (THIS fixes "Cannot GET /") -----
 * Order matters: define API routes FIRST, then static, then SPA fallback.
 */
app.use(express.static(DIST_DIR)); // serves /assets/* and index.html

// SPA fallback for any non-API, non-gallery route
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/gallery')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Gallery API: http://localhost:${PORT}/api/gallery`);
  console.log(`Static gallery: http://localhost:${PORT}/gallery`);
});
