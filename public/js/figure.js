/**
 * VIRASAT — Historical Figure Profile Script (public/js/figure.js)
 * 
 * Beginner-Friendly 1st Year B.Tech CS Architecture:
 * - Reads '?id=figureId' query parameter from the URL.
 * - Fetches enriched figure dossier from Express REST API: GET /api/figures/:id
 * - Injects biography, major achievements, and linked monument cards dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const figureId = params.get('id');

  if (!figureId) {
    showError('No historical figure ID specified in the URL.');
    return;
  }

  loadFigureDetails(figureId);
});

/**
 * Fetch figure data from server
 */
async function loadFigureDetails(id) {
  const loadingBox = document.getElementById('figure-loading');
  const errorBox = document.getElementById('figure-error');
  const profileBox = document.getElementById('figure-profile');

  try {
    const response = await fetch(`/api/figures/${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`Figure not found (Status: ${response.status})`);
    }

    const json = await response.json();
    const figure = json.data;

    if (!figure) {
      throw new Error('Figure record is empty.');
    }

    // Populate Page with Figure Data
    renderFigureProfile(figure);

    if (loadingBox) loadingBox.style.display = 'none';
    if (profileBox) profileBox.style.display = 'block';

  } catch (err) {
    console.error('Error fetching figure profile:', err);
    if (loadingBox) loadingBox.style.display = 'none';
    if (errorBox) {
      errorBox.style.display = 'block';
      errorBox.querySelector('p').textContent = err.message || 'Unable to load historical figure records.';
    }
  }
}

/**
 * Render all profile sections into the DOM
 */
function renderFigureProfile(fig) {
  // Page Title & Meta
  document.title = `${fig.name} — Historical Dossier | Virasat`;

  // Header Hero Elements
  setText('fig-name', fig.name);
  setText('fig-title', `👑 ${fig.title || 'Historical Figure'}`);
  setText('fig-reign', `⏳ Era: ${fig.era || 'Historic'}`);
  setText('fig-dynasty', `🏛️ Dynasty: ${fig.dynasty || 'Heritage of India'}`);
  setText('fig-era-badge', fig.dynasty || 'Historical Rulers & Figures');

  // Biography (split paragraphs if string has multiple lines or render as text)
  const bioContainer = document.getElementById('fig-biography');
  if (bioContainer) {
    const paragraphs = (fig.biography || fig.summary || '').split('\n\n').filter(p => p.trim().length > 0);
    bioContainer.innerHTML = paragraphs.map(p => `<p style="margin-bottom: 16px;">${escapeHtml(p)}</p>`).join('');
  }

  // Major Achievements
  const achievementsContainer = document.getElementById('fig-achievements');
  if (achievementsContainer) {
    const achievements = fig.majorAchievements || [];
    if (achievements.length > 0) {
      achievementsContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${achievements.map((ach, idx) => `
            <div class="arch-feature-item">
              <div class="arch-feature-title">✦ Milestone ${idx + 1}</div>
              <div class="arch-feature-desc">${escapeHtml(ach)}</div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      achievementsContainer.innerHTML = `<p style="color: var(--color-text-muted);">Historical achievements records preserved in archives.</p>`;
    }
  }

  // Associated Monuments Grid
  const monumentsContainer = document.getElementById('fig-monuments-grid');
  if (monumentsContainer) {
    // If backend resolved monument summaries (fig.resolvedMonuments)
    const monuments = fig.resolvedMonuments || fig.associatedMonumentsData || [];

    if (monuments.length > 0) {
      monumentsContainer.innerHTML = monuments.map(m => `
        <div class="assoc-monument-card">
          <div class="assoc-monument-img-wrapper">
            <img 
              src="${escapeHtml(m.heroImage || m.thumbnail || 'images/default-monument.jpg')}" 
              alt="${escapeHtml(m.name)}" 
              class="assoc-monument-img"
              loading="lazy"
              onerror="this.onerror=null; this.src='https://placehold.co/600x400/5A0E18/F4E8C1?text=' + encodeURIComponent('${escapeHtml(m.name)}');"
            />
            ${m.hasModel ? `<span class="badge-3d-active" style="position: absolute; top: 10px; right: 10px; font-size: 10px;">⚡ 3D Experience</span>` : ''}
          </div>
          <div class="assoc-monument-body">
            <span class="card-location">${escapeHtml(m.location || '')}</span>
            <h4 style="font-family: var(--font-serif); color: var(--color-maroon); font-size: 16px; margin-bottom: 8px;">
              ${escapeHtml(m.name)}
            </h4>
            <p style="font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 14px;">
              ${escapeHtml(m.shortDescription || '')}
            </p>
            <a href="monument.html?id=${encodeURIComponent(m.id)}" class="btn-explore" style="font-size: 12px; padding: 8px 14px; width: 100%; justify-content: center;">
              ${m.hasModel ? 'Explore in 3D →' : 'View Monument Details →'}
            </a>
          </div>
        </div>
      `).join('');
    } else {
      // Fallback: simple IDs list
      const ids = fig.associatedMonuments || [];
      monumentsContainer.innerHTML = ids.map(id => {
        const readable = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `
          <div class="assoc-monument-card" style="padding: 16px;">
            <h4 style="font-family: var(--font-serif); color: var(--color-maroon); margin-bottom: 8px;">${readable}</h4>
            <a href="monument.html?id=${id}" class="btn-explore" style="font-size: 12px; padding: 6px 12px;">
              Explore Monument →
            </a>
          </div>
        `;
      }).join('');
    }
  }

  // Sources (handle objects { title, url } or strings)
  const sourcesList = document.getElementById('fig-sources-list');
  if (sourcesList) {
    const sources = fig.sources || ['Archaeological Survey of India (ASI)', 'National Council of Educational Research and Training (NCERT)'];
    sourcesList.innerHTML = sources.map(src => {
      if (typeof src === 'object' && src !== null) {
        return `<li><a href="${escapeHtml(src.url)}" target="_blank" rel="noopener" style="color: var(--color-maroon); font-weight: 600;">${escapeHtml(src.title)} ↗</a></li>`;
      }
      return `<li>${escapeHtml(src)}</li>`;
    }).join('');
  }

  // Sidebar Portrait & Facts
  const portraitImg = document.getElementById('fig-portrait-img');
  if (portraitImg) {
    portraitImg.src = fig.thumbnail || fig.portraitImage || 'images/default-portrait.jpg';
    portraitImg.alt = fig.name;
    portraitImg.onerror = function() {
      this.onerror = null;
      this.src = `https://placehold.co/400x500/5A0E18/F4E8C1?text=${encodeURIComponent(fig.name)}`;
    };
  }

  setText('sb-fig-name', fig.name);
  setText('sb-fig-dynasty', fig.period || fig.dynasty || 'Ancient Bharat');
  setText('sb-fig-era', fig.lifespan || fig.period || fig.era || 'Historical Record');
  setText('sb-fig-capital', fig.capitalOrRegion || 'India');
  setText('sb-fig-role', fig.title || fig.role || 'Historical Leader');
}

/**
 * Utility to set text content of element safely
 */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '—';
}

/**
 * Utility to show error message
 */
function showError(msg) {
  const loadingBox = document.getElementById('figure-loading');
  const errorBox = document.getElementById('figure-error');
  if (loadingBox) loadingBox.style.display = 'none';
  if (errorBox) {
    errorBox.style.display = 'block';
    errorBox.querySelector('p').textContent = msg;
  }
}

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
