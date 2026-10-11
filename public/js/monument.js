/**
 * VIRASAT — Monument Details & 3D Viewer Script (public/js/monument.js)
 * 
 * Purpose:
 * Dynamically loads monument information from the Express backend (/api/monuments/:id)
 * based on the URL query parameter (e.g. ?id=taj-mahal, ?id=red-fort).
 * 
 * Features:
 * - Renders working Google <model-viewer> if hasModel = true (Taj Mahal, Ram Mandir).
 * - Renders honest "3D Model in Progress" status banner if hasModel = false.
 * - Displays associated historical figure cards with links to figure.html?id=...
 * - Displays architectural features, timeline, cultural significance, and facts.
 * - Displays verified sources & reference links.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Virasat Monument] Details page loaded');
  
  // 1. Read monument ID from URL query string (?id=...)
  const urlParams = new URLSearchParams(window.location.search);
  const monumentId = urlParams.get('id') || 'taj-mahal';

  console.log(`[Virasat Monument] Selected Monument ID: '${monumentId}'`);

  // 2. Fetch monument details from backend API
  fetchMonumentDetails(monumentId);

  // 3. Setup 3D viewer interactive controls
  setupModelViewerControls();
});

/**
 * Function: fetchMonumentDetails
 * Calls GET /api/monuments/:id to retrieve full historical dossier and 3D status.
 */
async function fetchMonumentDetails(id) {
  const loadingIndicator = document.getElementById('page-loading');
  const contentSection = document.getElementById('monument-content');
  const errorSection = document.getElementById('page-error');

  try {
    const response = await fetch(`/api/monuments/${encodeURIComponent(id)}`);

    // Handle 404 or server error
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Monument with ID "${id}" was not found in our catalog.`);
      }
      throw new Error(`Server returned HTTP status ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;

    console.log('[Virasat Monument] Successfully retrieved monument details:', data);

    // Hide loader and reveal content
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    if (contentSection) contentSection.style.display = 'block';

    // Populate all HTML sections with dynamic data
    renderMonumentData(data);

  } catch (err) {
    console.error('[Virasat Monument] Error fetching monument:', err);
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    if (errorSection) {
      errorSection.style.display = 'block';
      const msgText = document.getElementById('error-message-text');
      if (msgText) msgText.textContent = err.message;
    }
  }
}

/**
 * Function: renderMonumentData
 * Inserts the fetched monument data into the DOM.
 */
function renderMonumentData(monument) {
  // 1. Update Document Title
  document.title = `${monument.name} — Virasat 3D Heritage`;

  // 2. Header & Overview Info
  setText('monument-title', monument.name);
  setText('monument-category-badge', monument.category);
  setText('meta-location', monument.location);
  setText('meta-timeline', monument.timeline);
  setText('meta-commissioned', monument.commissionedBy || monument.dynasty || 'Historical Monument');

  // UNESCO Pill
  const unescoPill = document.getElementById('unesco-pill');
  if (unescoPill) {
    unescoPill.style.display = monument.isUNESCO ? 'inline-block' : 'none';
  }

  // 3. Hero Photography
  const heroImg = document.getElementById('monument-hero-image');
  if (heroImg) {
    heroImg.src = monument.thumbnail;
    heroImg.alt = monument.name;
  }

  // 4. Handle 3D Model vs "In Progress" Status
  const sectionViewer = document.getElementById('section-3d-viewer');
  const sectionPlaceholder = document.getElementById('section-3d-placeholder');
  const photoWrapper = document.getElementById('monument-photo-wrapper');
  const status3DText = document.getElementById('sidebar-3d-status');

  if (monument.hasModel && monument.modelPath) {
    // 3D Model is ready and verified
    if (sectionViewer) sectionViewer.style.display = 'block';
    if (sectionPlaceholder) sectionPlaceholder.style.display = 'none';
    if (photoWrapper) photoWrapper.style.display = 'none'; // 3D viewer takes primary visual place
    if (status3DText) status3DText.innerHTML = '<span style="color: #10B981; font-weight: bold;">● Active Interactive 3D Model</span>';
    
    // Configure <model-viewer>
    load3DModel(monument);
  } else {
    // 3D Model is under reconstruction
    if (sectionViewer) sectionViewer.style.display = 'none';
    if (sectionPlaceholder) sectionPlaceholder.style.display = 'block';
    if (photoWrapper) photoWrapper.style.display = 'block';
    if (status3DText) status3DText.innerHTML = '<span style="color: #F59E0B; font-weight: bold;">⏳ Photogrammetry in Progress</span>';
  }

  // 5. Historical Background
  setText('historical-background', monument.historicalBackground);

  // 6. Architecture Section
  if (monument.architecture) {
    setText('arch-style', monument.architecture.style);
    setText('arch-materials', monument.architecture.materials);
    setText('arch-overview', monument.architecture.overview);

    const featuresContainer = document.getElementById('arch-features-list');
    if (featuresContainer && monument.architecture.features) {
      featuresContainer.innerHTML = monument.architecture.features.map(f => `
        <div class="arch-feature-item">
          <h4 class="arch-feature-title">✦ ${f.title}</h4>
          <p class="arch-feature-desc">${f.description}</p>
        </div>
      `).join('');
    }
  }

  // 7. Cultural Significance
  setText('cultural-significance', monument.significance);

  // 8. Associated Historical Figures
  const figuresCard = document.getElementById('associated-figures-card');
  const figuresContainer = document.getElementById('associated-figures-container');
  if (monument.resolvedFigures && monument.resolvedFigures.length > 0) {
    if (figuresCard) figuresCard.style.display = 'block';
    if (figuresContainer) {
      figuresContainer.innerHTML = monument.resolvedFigures.map(fig => `
        <div class="assoc-figure-card">
          <img src="${fig.thumbnail}" alt="${fig.name}" class="assoc-figure-thumb" />
          <div class="assoc-figure-info">
            <h4 class="assoc-figure-name">${fig.name}</h4>
            <p class="assoc-figure-title">${fig.title}</p>
            <a href="figure.html?id=${fig.id}" class="assoc-figure-link">View Historical Profile →</a>
          </div>
        </div>
      `).join('');
    }
  } else {
    if (figuresCard) figuresCard.style.display = 'none';
  }

  // 9. Interesting Facts List
  const factsContainer = document.getElementById('facts-list');
  if (factsContainer && monument.facts) {
    factsContainer.innerHTML = monument.facts.map(fact => `
      <li>${fact}</li>
    `).join('');
  }

  // 10. Sources and Further Reading
  const sourcesContainer = document.getElementById('sources-list');
  if (sourcesContainer && monument.sources) {
    sourcesContainer.innerHTML = monument.sources.map(src => `
      <li>
        <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-link">
          🔗 ${src.title} ↗
        </a>
      </li>
    `).join('');
  }

  // 11. Sidebar Quick Summary
  setText('sidebar-name', monument.name);
  setText('sidebar-location', `${monument.city}, ${monument.state}`);
  setText('sidebar-category', monument.category);
  setText('sidebar-timeline', monument.timeline.split(';')[0]);
  if (monument.architecture) {
    setText('sidebar-style', monument.architecture.style.split('(')[0]);
  }
}

/**
 * Function: load3DModel
 * Configures the Google <model-viewer> web component.
 */
function load3DModel(monument) {
  const viewer = document.getElementById('heritage-model-viewer');
  const modelLoading = document.getElementById('model-loading');
  const modelError = document.getElementById('model-error');

  if (!viewer) return;

  // Show loading spinner for 3D model
  if (modelLoading) modelLoading.style.display = 'flex';
  if (modelError) modelError.style.display = 'none';

  // Set the 3D model path and descriptive alt text
  viewer.src = monument.modelPath;
  viewer.alt = `Interactive 3D historical reconstruction of ${monument.name}`;

  // EVENT 1: When 3D model successfully finishes rendering
  viewer.addEventListener('load', () => {
    console.log(`[Virasat 3D] Model loaded successfully: ${monument.modelPath}`);
    if (modelLoading) {
      modelLoading.style.opacity = '0';
      setTimeout(() => { modelLoading.style.display = 'none'; }, 300);
    }
  });

  // EVENT 2: If 3D model fails to load
  viewer.addEventListener('error', (event) => {
    console.error(`[Virasat 3D] Error loading 3D model: ${monument.modelPath}`, event);
    if (modelLoading) modelLoading.style.display = 'none';
    if (modelError) {
      modelError.style.display = 'flex';
      const pathDisplay = document.getElementById('error-model-path');
      if (pathDisplay) pathDisplay.textContent = monument.modelPath;
    }
  });
}

/**
 * Function: setupModelViewerControls
 * Wires up buttons for Reset View, Auto-Rotate, Zoom, and Retry.
 */
function setupModelViewerControls() {
  const viewer = document.getElementById('heritage-model-viewer');
  const btnReset = document.getElementById('btn-reset-view');
  const btnAutoRotate = document.getElementById('btn-toggle-rotate');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnRetry = document.getElementById('btn-retry-model');

  if (!viewer) return;

  // 1. Reset Camera View Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      console.log('[Virasat 3D] Resetting camera view');
      viewer.cameraOrbit = '45deg 75deg 18m';
      viewer.cameraTarget = 'auto auto auto';
      if (typeof viewer.resetTurntableRotation === 'function') {
        viewer.resetTurntableRotation();
      }
    });
  }

  // 2. Auto-Rotate Toggle Button
  if (btnAutoRotate) {
    btnAutoRotate.addEventListener('click', () => {
      const isRotating = viewer.hasAttribute('auto-rotate');
      if (isRotating) {
        viewer.removeAttribute('auto-rotate');
        btnAutoRotate.classList.remove('active');
        btnAutoRotate.innerHTML = '<span>🔄</span><span>Auto-Rotate: OFF</span>';
      } else {
        viewer.setAttribute('auto-rotate', '');
        btnAutoRotate.classList.add('active');
        btnAutoRotate.innerHTML = '<span>🔄</span><span>Auto-Rotate: ON</span>';
      }
    });
  }

  // 3. Zoom Controls
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      viewer.zoom(0.5);
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      viewer.zoom(-0.5);
    });
  }

  // 4. Retry Model Button
  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      const currentSrc = viewer.src;
      viewer.src = '';
      setTimeout(() => { viewer.src = currentSrc; }, 100);
    });
  }
}

/**
 * Helper: setText
 * Safe DOM text assignment utility.
 */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}
