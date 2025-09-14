import express from 'express';
import cors from 'cors';
import path from 'path';
import sharp from 'sharp';
import { getCachedGallery } from './scan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from data/gallery
app.use('/gallery', express.static(path.join(process.cwd(), 'data', 'gallery')));

// Image optimization endpoint
app.get('/gallery/*', async (req, res) => {
  const imagePath = path.join(process.cwd(), 'data', 'gallery', req.params[0] as string);
  
  try {
    if (!imagePath.startsWith(path.join(process.cwd(), 'data', 'gallery'))) {
      return res.status(403).send('Forbidden');
    }
    
    // Check if file exists
    if (!require('fs').existsSync(imagePath)) {
      return res.status(404).send('Image not found');
    }
    
    const sharpInstance = sharp(imagePath);
    
    // Get query parameters
    const width = req.query.w ? parseInt(req.query.w as string) : undefined;
    const height = req.query.h ? parseInt(req.query.h as string) : undefined;
    const quality = req.query.q ? parseInt(req.query.q as string) : 80;
    
    if (width || height) {
      sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert to JPEG with quality setting
    sharpInstance.jpeg({ quality });
    
    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
    
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Gallery API: http://localhost:${PORT}/api/gallery`);
  console.log(`Static files: http://localhost:${PORT}/gallery`);
});
