/**
 * VIRASAT — Explore Dashboard Script (public/js/explore.js)
 * 
 * Comprehensive 1st Year B.Tech CS Architecture:
 * 1. Debounced real-time text search across monument names, cities, states, dynasties, and figures.
 * 2. Visual Search Feature:
 *    - Live Device Camera capture (using navigator.mediaDevices.getUserMedia with facingMode: environment).
 *    - Image File Upload with drag-and-drop & mobile camera fallback.
 *    - Client-side visual color palette & feature analysis (White Marble, Red Sandstone, etc.).
 *    - Assisted search with optional architectural category & clue filters.
 *    - Respects privacy: stops camera tracks immediately, processes photos in memory, never persists them.
 * 3. REST API integration:
 *    - GET /api/monuments (search, category, state, unesco)
 *    - POST /api/visual-search (photo search & candidate matching)
 * 4. Honest presentation: transparent match explanations without fabricated AI percentages.
 */

// Global Dashboard Filter State
const appState = {
  search: '',
  category: 'all',
  state: 'all',
  unescoOnly: false,
  modelsOnly: false,
  isVisualSearchActive: false,
  visualCandidates: [],
  debounceTimer: null
};

// Visual Search Session State
const visualSearchState = {
  cameraStream: null,
  currentImageDataUrl: null,
  detectedPalette: 'general',
  paletteDescription: ''
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Virasat Explore] Initializing Heritage Dashboard & Visual Search Engine...');
  
  // 1. Load available states & categories metadata from backend
  loadFilterMetadata();

  // 2. Fetch and render initial monuments catalog
  fetchAndRenderMonuments();

  // 3. Attach core dashboard event listeners
  setupEventListeners();

  // 4. Initialize Visual Search & Camera handlers
  setupVisualSearch();
});

/**
 * =========================================================================
 * 1. CORE DASHBOARD EVENT LISTENERS (Search, Filter Chips, State, Toggles)
 * =========================================================================
 */
function setupEventListeners() {
  const searchInput = document.getElementById('monument-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const cameraBtn = document.getElementById('camera-search-btn');
  const stateSelect = document.getElementById('state-filter-select');
  const modelsToggle = document.getElementById('toggle-models-only');
  const resetBtn = document.getElementById('btn-reset-filters');
  const chipContainer = document.getElementById('category-chips-container');

  // A. Search Input with 250ms Debounce
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      appState.search = val;

      // Show/hide clear button
      if (clearBtn) {
        clearBtn.style.display = val.length > 0 ? 'block' : 'none';
      }

      // If text search is performed, clear visual search mode
      if (appState.isVisualSearchActive) {
        appState.isVisualSearchActive = false;
        hideVisualResultsBanner();
      }

      // Debounce API calls so we don't spam the server on every keystroke
      clearTimeout(appState.debounceTimer);
      appState.debounceTimer = setTimeout(() => {
        fetchAndRenderMonuments();
      }, 250);
    });
  }

  // B. Clear Search Button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      appState.search = '';
      clearBtn.style.display = 'none';
      fetchAndRenderMonuments();
      searchInput.focus();
    });
  }

  // C. Camera Icon Button on Search Bar
  if (cameraBtn) {
    cameraBtn.addEventListener('click', () => {
      openVisualSearchModal();
    });
  }

  // D. Category Chips Selection
  if (chipContainer) {
    chipContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.chip');
      if (!button) return;

      chipContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      button.classList.add('active');

      const isUnesco = button.dataset.unesco === 'true';
      if (isUnesco) {
        appState.unescoOnly = true;
        appState.category = 'all';
      } else {
        appState.unescoOnly = false;
        appState.category = button.dataset.category || 'all';
      }

      // Reset visual search if user explicitly filters categories
      if (appState.isVisualSearchActive) {
        appState.isVisualSearchActive = false;
        hideVisualResultsBanner();
      }

      fetchAndRenderMonuments();
    });
  }

  // E. State Dropdown Filter
  if (stateSelect) {
    stateSelect.addEventListener('change', (e) => {
      appState.state = e.target.value;
      if (appState.isVisualSearchActive) {
        appState.isVisualSearchActive = false;
        hideVisualResultsBanner();
      }
      fetchAndRenderMonuments();
    });
  }

  // F. 3D Models Only Toggle
  if (modelsToggle) {
    modelsToggle.addEventListener('change', (e) => {
      appState.modelsOnly = e.target.checked;
      if (appState.isVisualSearchActive) {
        renderVisualCandidates();
      } else {
        fetchAndRenderMonuments();
      }
    });
  }

  // G. Reset All Filters Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetAllFilters();
    });
  }
}

/**
 * =========================================================================
 * 2. VISUAL SEARCH & CAMERA CONTROLLER
 * =========================================================================
 */
function setupVisualSearch() {
  const modal = document.getElementById('visual-search-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const tabCamera = document.getElementById('tab-camera');
  const tabUpload = document.getElementById('tab-upload');
  const paneCamera = document.getElementById('pane-camera');
  const paneUpload = document.getElementById('pane-upload');
  
  const startCameraBtn = document.getElementById('btn-start-camera');
  const capturePhotoBtn = document.getElementById('btn-capture-photo');
  const stopCameraBtn = document.getElementById('btn-stop-camera');
  const switchToUploadBtn = document.getElementById('btn-switch-to-upload');

  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('visual-file-input');
  const browseBtn = document.getElementById('btn-browse-file');

  const retakeBtn = document.getElementById('btn-retake-photo');
  const findMonumentBtn = document.getElementById('btn-find-monument');

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeVisualSearchModal);
  }

  // Close modal on click outside modal card
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVisualSearchModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
      closeVisualSearchModal();
    }
  });

  // Tab Switching
  if (tabCamera && tabUpload) {
    tabCamera.addEventListener('click', () => {
      tabCamera.classList.add('active');
      tabUpload.classList.remove('active');
      if (paneCamera) paneCamera.style.display = 'block';
      if (paneUpload) paneUpload.style.display = 'none';
      hidePhotoPreview();
    });

    tabUpload.addEventListener('click', () => {
      tabUpload.classList.add('active');
      tabCamera.classList.remove('active');
      if (paneUpload) paneUpload.style.display = 'block';
      if (paneCamera) paneCamera.style.display = 'none';
      stopCameraStream();
      hidePhotoPreview();
    });
  }

  // Camera Actions
  if (startCameraBtn) startCameraBtn.addEventListener('click', startCamera);
  if (capturePhotoBtn) capturePhotoBtn.addEventListener('click', capturePhotoFromCamera);
  if (stopCameraBtn) stopCameraBtn.addEventListener('click', stopCameraStream);

  if (switchToUploadBtn) {
    switchToUploadBtn.addEventListener('click', () => {
      if (tabUpload) tabUpload.click();
    });
  }

  // Upload Actions
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== browseBtn) fileInput.click();
    });

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });
  }

  // Retake / Choose Another Photo
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      hidePhotoPreview();
      // Reset file input
      if (fileInput) fileInput.value = '';
      // Activate active tab pane
      if (tabCamera && tabCamera.classList.contains('active')) {
        if (paneCamera) paneCamera.style.display = 'block';
      } else {
        if (paneUpload) paneUpload.style.display = 'block';
      }
    });
  }

  // Submit Visual Search
  if (findMonumentBtn) {
    findMonumentBtn.addEventListener('click', executeVisualSearch);
  }
}

/**
 * Open Visual Search Modal
 */
window.openVisualSearchModal = function() {
  const modal = document.getElementById('visual-search-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
};

/**
 * Close Visual Search Modal & Stop Camera Stream
 */
window.closeVisualSearchModal = function() {
  const modal = document.getElementById('visual-search-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  // Stop camera tracks immediately when modal closes to protect user privacy
  stopCameraStream();
};

/**
 * Start Device Camera using navigator.mediaDevices.getUserMedia
 */
async function startCamera() {
  const video = document.getElementById('camera-video');
  const promptOverlay = document.getElementById('camera-prompt');
  const errorOverlay = document.getElementById('camera-error');
  const controlsBar = document.getElementById('camera-controls-bar');

  // Stop any active tracks first
  stopCameraStream();

  // Verify MediaDevices support
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showCameraError(
      'Camera API Not Supported',
      'Your browser does not support the MediaDevices camera API, or this page is not running on HTTPS or localhost. Please use the Upload Image tab.'
    );
    return;
  }

  try {
    // Prefer environment (rear) camera on mobile phones
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    console.log('[Visual Search] Requesting camera stream with constraints:', constraints);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    visualSearchState.cameraStream = stream;

    if (video) {
      video.srcObject = stream;
      await video.play();
    }

    if (promptOverlay) promptOverlay.style.display = 'none';
    if (errorOverlay) errorOverlay.style.display = 'none';
    if (controlsBar) controlsBar.style.display = 'flex';

  } catch (err) {
    console.warn('[Visual Search] Camera access error:', err);
    let title = 'Camera Access Blocked';
    let message = 'Camera permission was denied. You can easily upload a photograph from your device using the Upload Image tab.';

    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      title = 'No Camera Hardware Found';
      message = 'No video camera device was detected on your computer. Please use the Upload Image tab to select a photo.';
    } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      title = 'Camera Permission Denied';
      message = 'You blocked camera access for this site. To use the camera, allow permissions in your browser or switch to the Upload tab.';
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      title = 'Camera Already in Use';
      message = 'Your camera is currently in use by another program or browser tab. Please close other camera applications and try again.';
    }

    showCameraError(title, message);
  }
}

/**
 * Stop Camera Stream & Release Hardware
 */
function stopCameraStream() {
  if (visualSearchState.cameraStream) {
    visualSearchState.cameraStream.getTracks().forEach(track => {
      console.log('[Visual Search] Stopping camera track:', track.kind);
      track.stop();
    });
    visualSearchState.cameraStream = null;
  }

  const video = document.getElementById('camera-video');
  if (video) {
    video.srcObject = null;
  }

  const controlsBar = document.getElementById('camera-controls-bar');
  if (controlsBar) controlsBar.style.display = 'none';

  const promptOverlay = document.getElementById('camera-prompt');
  if (promptOverlay) promptOverlay.style.display = 'flex';
}

/**
 * Show friendly camera error message
 */
function showCameraError(title, message) {
  const promptOverlay = document.getElementById('camera-prompt');
  const errorOverlay = document.getElementById('camera-error');
  const errorTitle = document.getElementById('camera-error-title');
  const errorMsg = document.getElementById('camera-error-msg');
  const controlsBar = document.getElementById('camera-controls-bar');

  if (promptOverlay) promptOverlay.style.display = 'none';
  if (controlsBar) controlsBar.style.display = 'none';
  if (errorTitle) errorTitle.textContent = title;
  if (errorMsg) errorMsg.textContent = message;
  if (errorOverlay) errorOverlay.style.display = 'flex';
}

/**
 * Capture frame from live video feed onto off-screen canvas
 */
function capturePhotoFromCamera() {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  if (!video || !canvas) return;

  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
  visualSearchState.currentImageDataUrl = dataUrl;

  // Stop camera tracks immediately now that photo is captured
  stopCameraStream();

  // Display preview section and run visual analysis
  displayPhotoPreview(dataUrl, canvas);
}

/**
 * Handle File Selection from Upload Input or Drag & Drop
 */
function handleFileSelection(file) {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    alert('Please choose a valid image file (JPEG, PNG, or WebP).');
    return;
  }

  // Validate size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size exceeds 5MB limit. Please choose a smaller photograph.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    visualSearchState.currentImageDataUrl = dataUrl;

    // Load into off-screen image & canvas for palette analysis
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById('camera-canvas');
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        displayPhotoPreview(dataUrl, canvas);
      }
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

/**
 * Display Image Preview and run Client-side Color/Palette Analysis
 */
function displayPhotoPreview(dataUrl, canvas) {
  const previewSection = document.getElementById('photo-preview-section');
  const previewImg = document.getElementById('photo-preview-img');
  const paneCamera = document.getElementById('pane-camera');
  const paneUpload = document.getElementById('pane-upload');

  if (paneCamera) paneCamera.style.display = 'none';
  if (paneUpload) paneUpload.style.display = 'none';

  if (previewImg) previewImg.src = dataUrl;
  if (previewSection) previewSection.style.display = 'block';

  // Analyze Palette
  if (canvas) {
    analyzeImagePalette(canvas);
  }
}

/**
 * Hide Image Preview and return to tab selection
 */
function hidePhotoPreview() {
  const previewSection = document.getElementById('photo-preview-section');
  if (previewSection) previewSection.style.display = 'none';
  visualSearchState.currentImageDataUrl = null;
}

/**
 * Client-Side Image Palette & Feature Extraction
 * Computes average RGB, lightness, and color characteristics on a downscaled canvas
 */
function analyzeImagePalette(canvas) {
  const analysisTag = document.getElementById('visual-analysis-tag');
  if (!canvas || !analysisTag) return;

  try {
    // Sample downscaled 40x40 grid for high performance
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 40;
    sampleCanvas.height = 40;
    const ctx = sampleCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, 40, 40);

    const imgData = ctx.getImageData(0, 0, 40, 40);
    const data = imgData.data;

    let totalR = 0, totalG = 0, totalB = 0;
    const count = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
    }

    const avgR = totalR / count;
    const avgG = totalG / count;
    const avgB = totalB / count;
    const brightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

    let palette = 'general';
    let label = '🎨 Visual Palette: Architectural Structure';

    // 1. White / Light Marble (Taj Mahal, Victoria Memorial)
    if (brightness > 175 && Math.abs(avgR - avgG) < 25 && Math.abs(avgR - avgB) < 25) {
      palette = 'white_marble';
      label = '🎨 Detected Palette: Translucent White Marble & Domes';
    }
    // 2. Warm Red Sandstone (Red Fort, Agra Fort, Qutub Minar, Humayun\'s Tomb)
    else if (avgR > 115 && avgR > avgG + 20 && avgR > avgB + 30) {
      palette = 'red_sandstone';
      label = '🎨 Detected Palette: Warm Red Sandstone & Fort Ramparts';
    }
    // 3. Dark Rock / Basalt Excavations (Ajanta, Ellora Caves)
    else if (brightness < 85) {
      palette = 'dark_rock';
      label = '🎨 Detected Palette: Dark Basalt Rock Excavation';
    }
    // 4. Pinkish Buff / Granite (Ram Mandir, Konark, Hampi, Khajuraho)
    else {
      palette = 'pink_granite';
      label = '🎨 Detected Palette: Carved Sandstone & Temple Granite';
    }

    visualSearchState.detectedPalette = palette;
    visualSearchState.paletteDescription = label;

    analysisTag.innerHTML = `<span>${label}</span>`;
    analysisTag.style.display = 'inline-flex';

  } catch (err) {
    console.warn('[Visual Search] Could not extract color palette:', err);
    visualSearchState.detectedPalette = 'general';
    analysisTag.style.display = 'none';
  }
}

/**
 * Execute Visual Search: Submits photograph and clues to backend POST /api/visual-search
 */
async function executeVisualSearch() {
  const categorySelect = document.getElementById('visual-category-select');
  const clueInput = document.getElementById('visual-clue-input');
  const findBtn = document.getElementById('btn-find-monument');

  const selectedCategory = categorySelect ? categorySelect.value : 'all';
  const clueText = clueInput ? clueInput.value.trim() : '';

  const payload = {
    imageBase64: visualSearchState.currentImageDataUrl,
    category: selectedCategory,
    clue: clueText,
    detectedPalette: visualSearchState.detectedPalette
  };

  if (findBtn) {
    findBtn.disabled = true;
    findBtn.textContent = 'Searching Monument Catalog...';
  }

  try {
    const response = await fetch('/api/visual-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const result = await response.json();
    const candidates = result.data || [];

    // Close modal
    closeVisualSearchModal();

    // Activate Visual Search mode on dashboard
    appState.isVisualSearchActive = true;
    appState.visualCandidates = candidates;

    // Display Visual Search Banner
    showVisualResultsBanner(candidates.length, selectedCategory, clueText);

    // Render Candidate Cards
    renderVisualCandidates();

    // Scroll to results
    const banner = document.getElementById('visual-results-banner');
    if (banner) {
      banner.scrollIntoView({ behavior: 'smooth' });
    }

  } catch (err) {
    console.error('[Visual Search] Search execution failed:', err);
    alert('Visual search encountered an error: ' + err.message);
  } finally {
    if (findBtn) {
      findBtn.disabled = false;
      findBtn.textContent = '🔍 Find Matching Monuments →';
    }
  }
}

/**
 * Render Visual Search Candidates
 */
function renderVisualCandidates() {
  const container = document.getElementById('monuments-container');
  const emptyBox = document.getElementById('visual-empty-state');
  const standardEmptyBox = document.getElementById('monuments-empty');
  const loadingIndicator = document.getElementById('monuments-loading');

  if (loadingIndicator) loadingIndicator.style.display = 'none';
  if (standardEmptyBox) standardEmptyBox.style.display = 'none';

  let list = [...appState.visualCandidates];

  // Apply 3D models only filter if toggled
  if (appState.modelsOnly) {
    list = list.filter(m => m.hasModel);
  }

  if (list.length === 0) {
    if (container) container.innerHTML = '';
    if (emptyBox) emptyBox.style.display = 'block';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';
  if (container) {
    container.innerHTML = list.map(monument => renderMonumentCard(monument)).join('');
  }
}

/**
 * Show Visual Search active banner
 */
function showVisualResultsBanner(count, category, clue) {
  const banner = document.getElementById('visual-results-banner');
  const summaryText = document.getElementById('visual-search-summary-text');
  const countText = document.getElementById('results-count-text');

  if (banner) banner.style.display = 'block';

  let summary = `Found ${count} candidate monument${count === 1 ? '' : 's'} matching your photo's visual profile`;
  if (category && category !== 'all') {
    summary += ` in category "${category}"`;
  }
  if (clue) {
    summary += ` and keyword "${clue}"`;
  }

  if (summaryText) summaryText.textContent = summary + '.';
  if (countText) countText.textContent = `Visual Search: ${count} candidate matches found`;
}

/**
 * Hide Visual Search active banner
 */
function hideVisualResultsBanner() {
  const banner = document.getElementById('visual-results-banner');
  const emptyBox = document.getElementById('visual-empty-state');
  if (banner) banner.style.display = 'none';
  if (emptyBox) emptyBox.style.display = 'none';
}

/**
 * Clear visual search filter and reload default catalogue
 */
window.clearVisualSearch = function() {
  appState.isVisualSearchActive = false;
  appState.visualCandidates = [];
  hideVisualResultsBanner();
  fetchAndRenderMonuments();
};

/**
 * Focus text search input
 */
window.focusTextSearch = function() {
  clearVisualSearch();
  const searchInput = document.getElementById('monument-search-input');
  if (searchInput) {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * =========================================================================
 * 3. STANDARD CATALOG FETCHING & CARD RENDERING
 * =========================================================================
 */

/**
 * Load available states from /api/categories
 */
async function loadFilterMetadata() {
  const stateSelect = document.getElementById('state-filter-select');
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) return;

    const data = await response.json();
    if (data.states && stateSelect) {
      data.states.forEach(st => {
        const option = document.createElement('option');
        option.value = st;
        option.textContent = st;
        stateSelect.appendChild(option);
      });
    }
  } catch (err) {
    console.warn('[Virasat Explore] Could not load filter metadata:', err);
  }
}

/**
 * Fetch filtered monument list from GET /api/monuments
 */
async function fetchAndRenderMonuments() {
  const container = document.getElementById('monuments-container');
  const loadingIndicator = document.getElementById('monuments-loading');
  const errorIndicator = document.getElementById('monuments-error');
  const emptyIndicator = document.getElementById('monuments-empty');
  const countText = document.getElementById('results-count-text');

  // Build query string based on active state
  const params = new URLSearchParams();
  if (appState.search.trim()) params.append('search', appState.search.trim());
  if (appState.category && appState.category !== 'all') params.append('category', appState.category);
  if (appState.state && appState.state !== 'all') params.append('state', appState.state);
  if (appState.unescoOnly) params.append('unesco', 'true');

  const url = `/api/monuments?${params.toString()}`;
  console.log(`[Virasat Explore] Requesting: ${url}`);

  if (loadingIndicator) loadingIndicator.style.display = 'block';
  if (emptyIndicator) emptyIndicator.style.display = 'none';
  if (errorIndicator) errorIndicator.style.display = 'none';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const jsonResult = await response.json();
    let monumentList = jsonResult.data || [];

    // Apply client-side 3D models filter if checked
    if (appState.modelsOnly) {
      monumentList = monumentList.filter(m => m.hasModel);
    }

    if (loadingIndicator) loadingIndicator.style.display = 'none';

    // Update Result Count Text
    if (countText) {
      const activeFilterName = appState.category !== 'all' 
        ? `in "${appState.category}"`
        : appState.unescoOnly 
        ? 'in UNESCO Heritage' 
        : '';
      const stateFilterName = appState.state !== 'all' ? `in ${appState.state}` : '';
      
      countText.textContent = `Showing ${monumentList.length} of ${jsonResult.total || 20} monuments ${activeFilterName} ${stateFilterName}`;
    }

    // Handle Empty Results
    if (monumentList.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyIndicator) emptyIndicator.style.display = 'block';
      return;
    }

    // Render Cards Grid
    if (container) {
      container.innerHTML = monumentList.map(monument => renderMonumentCard(monument)).join('');
    }

  } catch (error) {
    console.error('[Virasat Explore] Error fetching monuments:', error);
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    if (errorIndicator) {
      errorIndicator.style.display = 'block';
      errorIndicator.innerHTML = `
        <div style="background-color: #FEE2E2; border: 1px solid #EF4444; color: #991B1B; padding: 20px; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 16px; margin-bottom: 8px;">⚠️ Could Not Connect to Server</h4>
          <p style="font-size: 13px;">${error.message}. Please verify the Express backend is running with <code>npm start</code>.</p>
          <button onclick="fetchAndRenderMonuments()" class="btn-primary" style="margin-top: 12px; padding: 8px 18px; font-size: 13px;">
            Retry Connection
          </button>
        </div>
      `;
    }
  }
}

/**
 * Render individual monument card
 */
function renderMonumentCard(monument) {
  // Model availability badge
  const modelBadge = monument.hasModel 
    ? `<span class="card-badge badge-3d-active" title="Working interactive 3D model available">🌐 3D Model Available</span>`
    : `<span class="card-badge badge-3d-soon" title="Historical data available; 3D model under photogrammetry reconstruction">⏳ 3D in Progress</span>`;

  // UNESCO World Heritage badge
  const unescoBadge = monument.isUNESCO 
    ? `<span class="unesco-star-badge" title="UNESCO World Heritage Site">⭐ UNESCO</span>` 
    : '';

  // Visual match reason pill
  const matchReasonTag = monument.matchReason
    ? `<div class="visual-match-reason-pill">🎯 ${escapeHtml(monument.matchReason)}</div>`
    : '';

  // CTA Button: 3D explore for available models, historical dossier for others
  const actionButton = monument.hasModel
    ? `<a href="monument.html?id=${monument.id}" class="btn-explore" id="btn-explore-${monument.id}">
         <span>Explore in 3D</span>
         <span>→</span>
       </a>`
    : `<a href="monument.html?id=${monument.id}" class="btn-explore-history" id="btn-explore-${monument.id}">
         <span>View History</span>
         <span>→</span>
       </a>`;

  return `
    <article class="monument-card" id="card-${monument.id}">
      <div class="card-image-wrapper">
        <img 
          src="${escapeHtml(monument.thumbnail)}" 
          alt="${escapeHtml(monument.name)}" 
          class="card-image"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'"
        />
        <div class="card-badges-container">
          ${modelBadge}
          ${unescoBadge}
        </div>
        <span class="card-state-pill">📍 ${escapeHtml(monument.state)}</span>
      </div>

      <div class="card-body">
        <span class="card-category-label">${escapeHtml(monument.category)}</span>
        <h3 class="card-title">${escapeHtml(monument.name)}</h3>
        <p class="card-dynasty">${escapeHtml(monument.location)} • ${escapeHtml(monument.dynasty || 'Ancient Heritage')}</p>
        <p class="card-desc">${escapeHtml(monument.shortDescription)}</p>
        ${matchReasonTag}

        <div class="card-footer">
          <span class="card-era-tag">
            ⏳ ${escapeHtml(monument.timeline.split(';')[0])}
          </span>
          ${actionButton}
        </div>
      </div>
    </article>
  `;
}

/**
 * Global Helper: applySearchTag
 */
window.applySearchTag = function(tag) {
  const input = document.getElementById('monument-search-input');
  if (input) {
    input.value = tag;
    appState.search = tag;
    if (appState.isVisualSearchActive) {
      appState.isVisualSearchActive = false;
      hideVisualResultsBanner();
    }
    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'block';
    fetchAndRenderMonuments();
  }
};

/**
 * Global Helper: filterByCategory
 */
window.filterByCategory = function(categoryName) {
  appState.category = categoryName;
  appState.unescoOnly = false;
  if (appState.isVisualSearchActive) {
    appState.isVisualSearchActive = false;
    hideVisualResultsBanner();
  }

  const chipContainer = document.getElementById('category-chips-container');
  if (chipContainer) {
    chipContainer.querySelectorAll('.chip').forEach(btn => {
      if (btn.dataset.category === categoryName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  fetchAndRenderMonuments();

  const catalog = document.getElementById('monuments-container');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Global Helper: resetAllFilters
 */
window.resetAllFilters = function() {
  appState.search = '';
  appState.category = 'all';
  appState.state = 'all';
  appState.unescoOnly = false;
  appState.modelsOnly = false;
  appState.isVisualSearchActive = false;
  appState.visualCandidates = [];

  hideVisualResultsBanner();

  const searchInput = document.getElementById('monument-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const stateSelect = document.getElementById('state-filter-select');
  const modelsToggle = document.getElementById('toggle-models-only');
  const chipContainer = document.getElementById('category-chips-container');

  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  if (stateSelect) stateSelect.value = 'all';
  if (modelsToggle) modelsToggle.checked = false;

  if (chipContainer) {
    chipContainer.querySelectorAll('.chip').forEach((c, idx) => {
      if (idx === 0) c.classList.add('active');
      else c.classList.remove('active');
    });
  }

  fetchAndRenderMonuments();
};

/**
 * Escape HTML utility
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
