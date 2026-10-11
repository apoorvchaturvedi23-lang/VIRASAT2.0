/**
 * VIRASAT — Historical Figures Directory Script (public/js/figures.js)
 * 
 * Beginner-Friendly 1st Year B.Tech CS Architecture:
 * - Fetches historical figures from Express REST API: GET /api/figures?search=...
 * - Renders dynamic figure dossier cards with associated monument badges.
 * - Debounces input search so it doesn't overload the server.
 */

// Global State
let allFigures = [];
let searchDebounceTimer = null;

// DOM Elements
const searchInput = document.getElementById('figures-search-input');
const clearBtn = document.getElementById('figures-clear-btn');
const loadingBox = document.getElementById('figures-loading');
const emptyBox = document.getElementById('figures-empty');
const figuresGrid = document.getElementById('figures-grid');
const countText = document.getElementById('figures-count-text');

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadFigures();
});

/**
 * Set up user interaction listeners
 */
function setupEventListeners() {
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = query ? 'inline-block' : 'none';

      // 250ms Debounce to prevent unnecessary requests while typing
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        loadFigures(query);
      }, 250);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      resetFiguresSearch();
    });
  }
}

/**
 * Fetch figures from backend Express API
 */
async function loadFigures(searchQuery = '') {
  try {
    if (loadingBox) loadingBox.style.display = 'flex';
    if (figuresGrid) figuresGrid.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'none';

    let url = '/api/figures';
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    allFigures = data.data || [];

    renderFigures(allFigures, searchQuery);
  } catch (err) {
    console.error('Failed to load figures:', err);
    if (loadingBox) loadingBox.style.display = 'none';
    if (emptyBox) {
      emptyBox.style.display = 'block';
      emptyBox.innerHTML = `
        <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
        <h3 style="color: var(--color-maroon);">Unable to Connect to Server</h3>
        <p style="color: var(--color-text-muted); font-size: 14px;">
          Make sure your Node.js backend server is running on port 3000 (<code>node server.js</code>).
        </p>
      `;
    }
    if (countText) countText.textContent = 'Connection error';
  }
}

/**
 * Render historical figure cards into the DOM
 */
function renderFigures(figures, query = '') {
  if (loadingBox) loadingBox.style.display = 'none';

  if (!figures || figures.length === 0) {
    if (emptyBox) emptyBox.style.display = 'block';
    if (figuresGrid) figuresGrid.style.display = 'none';
    if (countText) countText.textContent = '0 historical figures found';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';
  if (figuresGrid) figuresGrid.style.display = 'grid';

  // Update counter
  if (countText) {
    if (query) {
      countText.textContent = `Showing ${figures.length} figure${figures.length === 1 ? '' : 's'} matching "${query}"`;
    } else {
      countText.textContent = `Showing all ${figures.length} historical rulers, builders & spiritual leaders`;
    }
  }

  // Generate HTML for each figure card
  figuresGrid.innerHTML = figures.map(fig => {
    // Generate associated monument pill badges
    const monumentPills = (fig.associatedMonuments || []).map(mId => {
      // Convert slug like 'taj-mahal' into readable label
      const name = mId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `<a href="monument.html?id=${mId}" class="figure-monument-pill" title="Explore ${name} monument">🏛️ ${name}</a>`;
    }).join('');

    // Generate achievement bullets (first 2 for preview)
    const achievementsPreview = (fig.majorAchievements || []).slice(0, 2).map(ach => {
      return `<li>${escapeHtml(ach)}</li>`;
    }).join('');

    const portraitSrc = fig.thumbnail || fig.portraitImage || 'images/default-portrait.jpg';
    const eraText = fig.period || fig.era || 'Historical Era';
    const bioText = fig.summary || (fig.biography ? (fig.biography.length > 160 ? fig.biography.slice(0, 160) + '...' : fig.biography) : '');

    return `
      <article class="figure-card">
        <div class="figure-card-header">
          <div class="figure-portrait-wrapper">
            <img 
              src="${escapeHtml(portraitSrc)}" 
              alt="${escapeHtml(fig.name)}" 
              class="figure-portrait" 
              loading="lazy"
              onerror="this.onerror=null; this.src='https://placehold.co/400x400/5A0E18/F4E8C1?text=' + encodeURIComponent('${escapeHtml(fig.name)}');"
            />
          </div>
          <div class="figure-header-info">
            <span class="figure-era-tag">${escapeHtml(eraText)}</span>
            <h3 class="figure-card-name">${escapeHtml(fig.name)}</h3>
            <p class="figure-card-title">${escapeHtml(fig.title || '')}</p>
          </div>
        </div>

        <div class="figure-card-body">
          <p class="figure-bio-summary">${escapeHtml(bioText)}</p>

          ${achievementsPreview ? `
            <div class="figure-highlights-box">
              <span class="highlights-label">Key Milestones:</span>
              <ul class="figure-highlights-list">
                ${achievementsPreview}
              </ul>
            </div>
          ` : ''}

          ${monumentPills ? `
            <div class="figure-monuments-section">
              <span class="highlights-label">Associated Monuments:</span>
              <div class="figure-pills-row">
                ${monumentPills}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="figure-card-footer">
          <a href="figure.html?id=${encodeURIComponent(fig.id)}" class="btn-explore" style="width: 100%; justify-content: center;">
            View Historical Dossier →
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Click handler for popular search tag pills
 */
window.searchFigureTag = function(tag) {
  if (searchInput) {
    searchInput.value = tag;
    if (clearBtn) clearBtn.style.display = 'inline-block';
    loadFigures(tag);
    searchInput.focus();
  }
};

/**
 * Reset search input and reload full catalogue
 */
window.resetFiguresSearch = function() {
  if (searchInput) {
    searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
  }
  loadFigures('');
};

/**
 * Utility to escape HTML and prevent XSS injection
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
