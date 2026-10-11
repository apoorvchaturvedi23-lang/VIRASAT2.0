/**
 * VIRASAT — Backend Server (server.js)
 * 
 * Purpose:
 * Node.js and Express REST API server powering the Virasat Heritage Discovery Platform.
 * 
 * Capabilities:
 * 1. Serves static frontend assets (HTML, CSS, JS, images, 3D GLB models).
 * 2. Search & filter REST endpoints for 20 Indian monuments.
 * 3. Historical figures directory endpoints with bidirectional monument links.
 * 4. Categories aggregation endpoint.
 * 5. Friendly error handling (404 for unknown resources).
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { monuments } from './data/monuments.js';
import { figures } from './data/figures.js';

// Resolve directory paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing (configured with 10MB limit for visual search images)
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// =========================================================================
// CONVENIENCE HTML PAGE ROUTES
// =========================================================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});

app.get('/monument', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'monument.html'));
});

app.get('/figures', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'figures.html'));
});

app.get('/figure', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'figure.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// =========================================================================
// REST API ENDPOINTS: MONUMENTS
// =========================================================================

/**
 * Route: GET /api/monuments
 * Supports Query Parameters:
 *   - search=...   (searches name, alternate names, location, state, dynasty, architectural style, keywords)
 *   - category=... (filters by monument category)
 *   - state=...    (filters by Indian state)
 *   - unesco=true  (filters by UNESCO World Heritage status)
 */
app.get('/api/monuments', (req, res) => {
  const { search, category, state, unesco } = req.query;
  console.log(`[API] GET /api/monuments - search="${search || ''}" category="${category || ''}" state="${state || ''}"`);

  let results = [...monuments];

  // 1. Text Search Filter (Case-insensitive, partial match)
  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    
    // Find matching figures to also include monuments associated with them
    const matchingFigureIds = figures
      .filter(f => f.name.toLowerCase().includes(query) || f.title.toLowerCase().includes(query))
      .map(f => f.id);

    results = results.filter(m => {
      const nameMatch = m.name.toLowerCase().includes(query);
      const altMatch = m.alternateNames && m.alternateNames.some(a => a.toLowerCase().includes(query));
      const locMatch = m.location.toLowerCase().includes(query) || m.city.toLowerCase().includes(query) || m.state.toLowerCase().includes(query);
      const dynastyMatch = (m.dynasty && m.dynasty.toLowerCase().includes(query)) || (m.patron && m.patron.toLowerCase().includes(query));
      const styleMatch = m.architecturalStyle && m.architecturalStyle.toLowerCase().includes(query);
      const catMatch = m.category && m.category.toLowerCase().includes(query);
      const descMatch = m.shortDescription && m.shortDescription.toLowerCase().includes(query);
      const figureMatch = m.associatedFigures && m.associatedFigures.some(fid => matchingFigureIds.includes(fid));

      return nameMatch || altMatch || locMatch || dynastyMatch || styleMatch || catMatch || descMatch || figureMatch;
    });
  }

  // 2. Category Filter
  if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
    const catQuery = category.trim().toLowerCase();
    results = results.filter(m => m.category.toLowerCase() === catQuery);
  }

  // 3. State / Region Filter
  if (state && state.trim() !== '' && state.toLowerCase() !== 'all') {
    const stateQuery = state.trim().toLowerCase();
    results = results.filter(m => m.state.toLowerCase() === stateQuery);
  }

  // 4. UNESCO Filter
  if (unesco === 'true') {
    results = results.filter(m => m.isUNESCO === true);
  }

  res.status(200).json({
    success: true,
    count: results.length,
    total: monuments.length,
    data: results
  });
});

/**
 * Route: GET /api/monuments/:id
 * Returns detailed data for a specific monument ID.
 * Enriches response with resolved historical figure objects.
 */
app.get('/api/monuments/:id', (req, res) => {
  const requestedId = req.params.id.toLowerCase();
  console.log(`[API] GET /api/monuments/${requestedId}`);

  const monument = monuments.find(m => m.id.toLowerCase() === requestedId);

  if (!monument) {
    return res.status(404).json({
      success: false,
      message: `Monument with ID '${requestedId}' was not found. Please browse the catalogue on /explore.html.`
    });
  }

  // Resolve associated historical figure details
  const resolvedFigures = (monument.associatedFigures || []).map(figId => {
    return figures.find(f => f.id === figId) || null;
  }).filter(Boolean);

  // Return full monument details with enriched figures
  res.status(200).json({
    success: true,
    data: {
      ...monument,
      resolvedFigures
    }
  });
});

// =========================================================================
// REST API ENDPOINTS: HISTORICAL FIGURES
// =========================================================================

/**
 * Route: GET /api/figures
 * Supports Query Parameters:
 *   - search=... (searches figure name, title, era, achievements)
 */
app.get('/api/figures', (req, res) => {
  const { search } = req.query;
  console.log(`[API] GET /api/figures - search="${search || ''}"`);

  let results = [...figures];

  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    results = results.filter(f => {
      const nameMatch = f.name.toLowerCase().includes(query);
      const titleMatch = f.title.toLowerCase().includes(query);
      const periodMatch = f.period.toLowerCase().includes(query);
      const bioMatch = f.biography.toLowerCase().includes(query);
      return nameMatch || titleMatch || periodMatch || bioMatch;
    });
  }

  res.status(200).json({
    success: true,
    count: results.length,
    total: figures.length,
    data: results
  });
});

/**
 * Route: GET /api/figures/:id
 * Returns detailed biographical profile for a historical figure.
 * Enriches response with resolved associated monument cards.
 */
app.get('/api/figures/:id', (req, res) => {
  const requestedId = req.params.id.toLowerCase();
  console.log(`[API] GET /api/figures/${requestedId}`);

  const figure = figures.find(f => f.id.toLowerCase() === requestedId);

  if (!figure) {
    return res.status(404).json({
      success: false,
      message: `Historical figure with ID '${requestedId}' was not found.`
    });
  }

  // Resolve associated monument summaries
  const resolvedMonuments = (figure.associatedMonuments || []).map(monId => {
    const m = monuments.find(site => site.id === monId);
    if (!m) return null;
    return {
      id: m.id,
      name: m.name,
      location: m.location,
      thumbnail: m.thumbnail,
      heroImage: m.heroImage || m.thumbnail,
      shortDescription: m.shortDescription,
      hasModel: m.hasModel,
      category: m.category
    };
  }).filter(Boolean);

  res.status(200).json({
    success: true,
    data: {
      ...figure,
      resolvedMonuments
    }
  });
});

// =========================================================================
// REST API ENDPOINTS: VISUAL SEARCH
// =========================================================================

/**
 * Route: POST /api/visual-search
 * 
 * Purpose:
 * Visual & photo-assisted search endpoint for Indian monuments.
 * 
 * Request Body:
 *   - imageBase64:     (optional) Base64 data URL of captured or uploaded photograph.
 *   - category:        (optional) Architectural category hint ("Tombs & Mausoleums", etc.).
 *   - clue:            (optional) User-provided clue ("White marble", "Ayodhya", etc.).
 *   - detectedPalette: (optional) Color/material profile analyzed on client.
 * 
 * Honest Architecture:
 * - Validates file size (max 5MB) and mime type (jpeg, png, webp).
 * - Matches candidates across the 20 monuments based on architectural features, materials, and category.
 * - Does NOT fabricate fake neural network confidence percentages.
 * - Provides explainable match reasons for each candidate.
 */
app.post('/api/visual-search', (req, res) => {
  const { imageBase64, category, clue, detectedPalette } = req.body;
  console.log(`[API] POST /api/visual-search - category="${category || 'all'}" clue="${clue || ''}" palette="${detectedPalette || 'unknown'}"`);

  // 1. Validate image if supplied
  if (imageBase64) {
    const match = imageBase64.match(/^data:(image\/(jpeg|png|webp|jpg));base64,/i);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Supported formats are JPEG, PNG, and WebP.'
      });
    }

    // Estimate base64 byte size
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const approximateBytes = (base64Data.length * 3) / 4;
    if (approximateBytes > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Image size exceeds maximum limit of 5MB. Please choose a smaller photograph.'
      });
    }
  }

  // 2. Candidate Filtering Engine across the 20 monuments
  let scoredCandidates = monuments.map(monument => {
    let score = 0;
    const reasons = [];

    // A. Architectural Category match
    if (category && category !== 'all') {
      if (monument.category.toLowerCase() === category.toLowerCase()) {
        score += 40;
        reasons.push(`Matched Category: ${monument.category}`);
      }
    }

    // B. Text Clue Match (name, city, state, style, materials, dynasty, features)
    if (clue && clue.trim()) {
      const q = clue.trim().toLowerCase();
      const nameMatch = monument.name.toLowerCase().includes(q);
      const altMatch = monument.alternateNames && monument.alternateNames.some(a => a.toLowerCase().includes(q));
      const locMatch = monument.location.toLowerCase().includes(q) || monument.state.toLowerCase().includes(q) || monument.city.toLowerCase().includes(q);
      const styleMatch = monument.architecturalStyle && monument.architecturalStyle.toLowerCase().includes(q);
      const matMatch = monument.architecture && monument.architecture.materials && monument.architecture.materials.toLowerCase().includes(q);
      const descMatch = monument.shortDescription && monument.shortDescription.toLowerCase().includes(q);

      if (nameMatch || altMatch) {
        score += 50;
        reasons.push(`Direct Name Reference: "${monument.name}"`);
      } else if (locMatch) {
        score += 35;
        reasons.push(`Regional Match: ${monument.location}`);
      } else if (styleMatch || matMatch) {
        score += 30;
        reasons.push(`Architectural Feature Match: ${monument.architecturalStyle}`);
      } else if (descMatch) {
        score += 20;
        reasons.push('Historical Description Keyword Match');
      }
    }

    // C. Detected Visual Palette Match
    if (detectedPalette) {
      const materials = (monument.architecture && monument.architecture.materials) ? monument.architecture.materials.toLowerCase() : '';
      const style = monument.architecturalStyle ? monument.architecturalStyle.toLowerCase() : '';
      const desc = monument.shortDescription ? monument.shortDescription.toLowerCase() : '';

      if (detectedPalette === 'white_marble') {
        if (materials.includes('marble') || desc.includes('marble') || monument.id === 'taj-mahal') {
          score += 35;
          reasons.push('Visual Palette: White Marble & Domed Architecture');
        }
      } else if (detectedPalette === 'red_sandstone') {
        if (materials.includes('red sandstone') || desc.includes('red sandstone') || monument.name.includes('Red Fort')) {
          score += 35;
          reasons.push('Visual Palette: Red Sandstone & Fort Bastions');
        }
      } else if (detectedPalette === 'pink_granite') {
        if (materials.includes('sandstone') || materials.includes('granite') || style.includes('nagara') || style.includes('dravidian') || monument.id === 'ram-mandir') {
          score += 30;
          reasons.push('Visual Palette: Carved Sandstone / Nagara & Dravidian Stone');
        }
      } else if (detectedPalette === 'dark_rock') {
        if (materials.includes('basalt') || materials.includes('rock') || monument.category === 'Ancient Caves') {
          score += 35;
          reasons.push('Visual Palette: Monolithic Basalt Rock Excavation');
        }
      }
    }

    return {
      monument,
      score,
      matchReason: reasons.length > 0 ? reasons.join(' • ') : 'Visual Catalogue Candidate'
    };
  });

  // Filter candidates if a specific filter/clue/palette was provided
  const hasFilter = (category && category !== 'all') || (clue && clue.trim()) || (detectedPalette && detectedPalette !== 'general');
  let candidates = [];

  if (hasFilter) {
    candidates = scoredCandidates
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => ({
        ...item.monument,
        matchReason: item.matchReason
      }));
  } else {
    // If no specific clues provided, return full catalogue with Taj Mahal & Ram Mandir featured first
    candidates = monuments.map(m => ({
      ...m,
      matchReason: m.hasModel ? 'Featured 3D Heritage Landmark' : 'Curated Indian Monument'
    }));
  }

  res.status(200).json({
    success: true,
    totalCatalog: monuments.length,
    candidatesCount: candidates.length,
    searchMethod: hasFilter ? 'architectural_feature_matching' : 'catalogue_browsing',
    detectedPalette: detectedPalette || 'general',
    data: candidates
  });
});

// =========================================================================
// REST API ENDPOINTS: CATEGORIES & METADATA
// =========================================================================

/**
 * Route: GET /api/categories
 * Returns list of all categories with monument counts and available states.
 */
app.get('/api/categories', (req, res) => {
  const categoryCounts = {};
  const stateCounts = {};

  monuments.forEach(m => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
    stateCounts[m.state] = (stateCounts[m.state] || 0) + 1;
  });

  const categoryList = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  const stateList = Object.keys(stateCounts).sort();

  res.status(200).json({
    success: true,
    categories: categoryList,
    states: stateList,
    unescoCount: monuments.filter(m => m.isUNESCO).length,
    modelsCount: monuments.filter(m => m.hasModel).length
  });
});

// Start Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`  VIRASAT — Indian Heritage Discovery Platform`);
  console.log(`  Local URL:        http://localhost:${PORT}`);
  console.log(`  Monuments API:    http://localhost:${PORT}/api/monuments`);
  console.log(`  Figures API:      http://localhost:${PORT}/api/figures`);
  console.log(`  Categories API:   http://localhost:${PORT}/api/categories`);
  console.log('====================================================');
});
