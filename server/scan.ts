import fs from 'fs';
import path from 'path';

export interface Pair {
  base: string;
  beforeUrl: string;
  afterUrl: string;
  caption?: string;
}

export interface Group {
  name: string;
  slug: string;
  note?: string;
  pairs: Pair[];
}

export interface Gallery {
  groups: Group[];
}

export interface MetaConfig {
  order?: string[];
  hidden?: string[];
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const GALLERY_PATH = path.join(process.cwd(), 'data', 'gallery');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getBaseName(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

function readMetaConfig(folderPath: string): MetaConfig {
  const metaPath = path.join(folderPath, 'meta.json');
  try {
    if (fs.existsSync(metaPath)) {
      const content = fs.readFileSync(metaPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`Failed to read meta.json in ${folderPath}:`, error);
  }
  return {};
}

function readNotes(folderPath: string): string | undefined {
  const notesPath = path.join(folderPath, 'notes.txt');
  try {
    if (fs.existsSync(notesPath)) {
      return fs.readFileSync(notesPath, 'utf-8').trim();
    }
  } catch (error) {
    console.warn(`Failed to read notes.txt in ${folderPath}:`, error);
  }
  return undefined;
}

function readCaption(folderPath: string, baseName: string): string | undefined {
  const captionPath = path.join(folderPath, `${baseName}.txt`);
  try {
    if (fs.existsSync(captionPath)) {
      return fs.readFileSync(captionPath, 'utf-8').trim();
    }
  } catch (error) {
    console.warn(`Failed to read caption for ${baseName}:`, error);
  }
  return undefined;
}

export function scanGallery(): Gallery {
  const groups: Group[] = [];

  try {
    if (!fs.existsSync(GALLERY_PATH)) {
      console.warn(`Gallery directory not found: ${GALLERY_PATH}`);
      return { groups: [] };
    }

    const folders = fs.readdirSync(GALLERY_PATH, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const folderName of folders) {
      const folderPath = path.join(GALLERY_PATH, folderName);
      const files = fs.readdirSync(folderPath);
      
      const imageFiles = files.filter(isImageFile);
      const meta = readMetaConfig(folderPath);
      const note = readNotes(folderPath);
      
      // Separate before and after files
      const beforeFiles = new Map<string, string>();
      const afterFiles = new Map<string, string>();
      
      for (const file of imageFiles) {
        const baseName = getBaseName(file);
        
        if (baseName.startsWith('before')) {
          const pairKey = baseName.replace(/^before/, '') || 'main';
          beforeFiles.set(pairKey, file);
        } else if (baseName.startsWith('after')) {
          const pairKey = baseName.replace(/^after/, '') || 'main';
          afterFiles.set(pairKey, file);
        }
      }
      
      // Create pairs from matched before/after files
      const pairs: Pair[] = [];
      
      for (const [pairKey, beforeFile] of beforeFiles) {
        const afterFile = afterFiles.get(pairKey);
        
        if (afterFile) {
          const caption = readCaption(folderPath, `before${pairKey === 'main' ? '' : pairKey}`);
          
          const pair: Pair = {
            base: pairKey,
            beforeUrl: `/gallery/${folderName}/${beforeFile}`,
            afterUrl: `/gallery/${folderName}/${afterFile}`,
            caption
          };
          
          pairs.push(pair);
        }
      }
      
      // Apply meta configuration
      let finalPairs = pairs;
      
      if (meta.hidden) {
        finalPairs = finalPairs.filter(pair => !meta.hidden!.includes(pair.base));
      }
      
      if (meta.order) {
        const orderMap = new Map(meta.order.map((item, index) => [item, index]));
        finalPairs.sort((a, b) => {
          const aOrder = orderMap.get(a.base) ?? 999;
          const bOrder = orderMap.get(b.base) ?? 999;
          return aOrder - bOrder;
        });
      }
      
      if (finalPairs.length > 0) {
        groups.push({
          name: folderName,
          slug: slugify(folderName),
          note,
          pairs: finalPairs
        });
      }
    }
  } catch (error) {
    console.error('Error scanning gallery:', error);
  }

  return { groups };
}

// Cache for 30 seconds
let cache: { data: Gallery; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 1000;

export function getCachedGallery(): Gallery {
  const now = Date.now();
  
  if (!cache || (now - cache.timestamp) > CACHE_DURATION) {
    cache = {
      data: scanGallery(),
      timestamp: now
    };
  }
  
  return cache.data;
}
