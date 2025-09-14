# Aardvark Instrument Repair Website

A modern, responsive website for Aardvark Instrument Repair built with React, TypeScript, and Tailwind CSS. The site features a filesystem-based CMS for managing repair galleries and showcases professional instrument repair services.

## Features

- **Filesystem-based CMS**: No database required - just organize files in folders
- **Before/After Gallery**: Interactive flip cards with lightbox comparison
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support
- **Image Optimization**: Automatic image resizing and caching with Sharp
- **Modern UI**: Beautiful design with Tailwind CSS and smooth animations

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Image Processing**: Sharp
- **Build Tool**: Vite
- **Package Manager**: npm

## Gallery File Structure

The gallery system uses a simple folder-based structure in `/data/gallery/`:

```
/data/gallery/
  Instrument Name/
    before.jpg          # Before repair image
    after.jpg           # After repair image
    before-2.jpg        # Additional before image
    after-2.jpg         # Additional after image
    notes.txt           # Optional caption for the entire folder
    before-2.txt        # Optional caption for specific pair
    meta.json           # Optional configuration
```

### File Naming Rules

- **Pairing**: `before.jpg` pairs with `after.jpg`, `before-2.jpg` pairs with `after-2.jpg`, etc.
- **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp` (case-insensitive)
- **Captions**: 
  - `notes.txt` - Caption for the entire folder (shown under heading)
  - `{basename}.txt` - Caption for a specific before/after pair

### Meta Configuration

Create a `meta.json` file in any folder to control display:

```json
{
  "order": ["before-2", "before"],  // Custom order for pairs
  "hidden": ["before-3"]            // Hide specific pairs
}
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aardvark-instrument-repair
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start:
- Express server on http://localhost:3000
- Vite dev server on http://localhost:5173

### Building for Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /api/gallery` - Returns gallery data as JSON
- `GET /gallery/*` - Serves static gallery files with optional image optimization
- `GET /api/health` - Health check endpoint

## Gallery API Response

```typescript
type Pair = {
  base: string;
  beforeUrl: string;
  afterUrl: string;
  caption?: string;
};

type Group = {
  name: string;    // folder name
  slug: string;    // slugified folder name
  note?: string;   // from notes.txt
  pairs: Pair[];
};

type Gallery = { groups: Group[] };
```

## Image Optimization

The server automatically optimizes images on first request:
- Resize to specified dimensions (`?w=800&h=600`)
- Adjust quality (`?q=80`)
- Convert to JPEG format
- Cache for 1 year

## Development

### Project Structure

```
├── src/
│   ├── components/          # Reusable React components
│   │   ├── FlipCard.tsx    # Before/After flip card
│   │   ├── Lightbox.tsx    # Image comparison lightbox
│   │   └── ...
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   └── ...
│   └── App.tsx
├── server/
│   ├── index.ts           # Express server
│   └── scan.ts            # Gallery scanner
├── data/
│   └── gallery/           # Gallery images and metadata
└── public/                # Static assets
```

### Adding New Gallery Items

1. Create a new folder in `/data/gallery/` with the instrument name
2. Add before/after image pairs (e.g., `before.jpg` and `after.jpg`)
3. Optionally add captions or configuration files
4. The gallery will automatically update (cache refreshes every 30 seconds)

### Customization

- **Colors**: Update `tailwind.config.js` to change the color palette
- **Content**: Edit the section components in `/src/sections/`
- **Styling**: Modify `/src/index.css` for global styles

## Performance

The site is optimized for performance:
- Image lazy loading
- Optimized bundle size with Vite
- Efficient caching strategies
- Responsive images
- Minimal JavaScript footprint

## Accessibility

- Full keyboard navigation
- Screen reader support
- High contrast ratios
- Focus indicators
- Semantic HTML structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, contact info@aardvarkrepair.com
