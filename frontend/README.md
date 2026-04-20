# BarkID — Neural Breed Classifier

AI-powered dog breed identifier. Identifies 120+ breeds from a photo using EfficientNet-B3.

## Project Structure

```
barkid/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BgOrbs.jsx / .module.css
│   │   ├── BottomBar.jsx / .module.css
│   │   ├── CameraModal.jsx / .module.css
│   │   ├── Header.jsx / .module.css
│   │   ├── Hero.jsx / .module.css
│   │   ├── LoadingOverlay.jsx / .module.css
│   │   ├── ResultsPanel.jsx / .module.css
│   │   └── UploadZone.jsx / .module.css
│   ├── hooks/
│   │   ├── useCamera.js
│   │   └── usePredictor.js
│   ├── utils/
│   │   ├── api.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure your backend URL
cp .env.example .env
# Edit .env → set REACT_APP_API_URL=http://your-backend-url

# 3. Start development server
npm start
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:5000` | Your Flask backend base URL |

## Backend API Contract

Your Flask backend must expose:

### POST `/predict/upload`
- Body: `multipart/form-data` with field `file` (image)
- Response: `{ predictions: [{ breed: string, pct: number }, ...] }`

### POST `/predict/url`
- Body: `{ url: string, top_k: number }`
- Response: `{ predictions: [{ breed: string, pct: number }, ...] }`

### Error responses
- Both endpoints should return `{ error: string }` on failure.

## Build & Deploy

```bash
# Build production bundle
npm run build

# The build/ folder can be deployed to:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod --dir=build
# - GitHub Pages: gh-pages -d build
# - Any static host (Nginx, S3, etc.)
```

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
# Follow prompts — set REACT_APP_API_URL in Vercel dashboard under Settings → Environment Variables
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
# Set REACT_APP_API_URL in Netlify dashboard → Site settings → Environment variables
```

## CORS

Make sure your Flask backend has CORS enabled for your frontend domain:

```python
from flask_cors import CORS
CORS(app, origins=["https://your-frontend-domain.com"])
```
