/**
 * VIRASAT — Home Page Script (public/js/home.js)
 * 
 * Purpose:
 * Connects the frontend home landing page to our Node.js / Express backend.
 * 
 * Student Viva Concepts Used:
 * 1. `document.addEventListener('DOMContentLoaded', ...)` ensures HTML is fully parsed before executing JS.
 * 2. `fetch('/api/monuments')` issues an asynchronous HTTP GET request to our backend server.
 * 3. `async / await` syntax handles asynchronous promises cleanly without callback hell.
 * 4. DOM manipulation (`document.getElementById`, `innerHTML`, template literals) renders dynamic cards.
 * 5. Error handling (`try...catch`) displays user-friendly fallback messages if the server is offline.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Virasat Frontend] Home page loaded — fetching monuments from backend...');
  loadMonumentsFromBackend();
});

/**
 * Function: loadMonumentsFromBackend
 * Fetches the monuments list from our Express REST API: GET /api/monuments
 */
async function loadMonumentsFromBackend() {
  const container = document.getElementById('monuments-container');
  const loadingIndicator = document.getElementById('monuments-loading');
  const errorIndicator = document.getElementById('monuments-error');

  try {
    // 1. Fetch data from our Express backend API endpoint
    const response = await fetch('/api/monuments');

    // 2. Check if HTTP status code is 200 (OK)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Parse JSON data sent by the backend
    const jsonResult = await response.json();
    console.log('[Virasat Frontend] Received data from backend:', jsonResult);

    const monumentList = jsonResult.data;

    // 4. Hide loading indicator
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }

    // 5. Check if monuments array exists and has items
    if (!monumentList || monumentList.length === 0) {
      container.innerHTML = '<p class="error-msg">No monuments found in the database.</p>';
      return;
    }

    // 6. Generate HTML cards for each monument dynamically
    container.innerHTML = monumentList.map(monument => {
      return `
        <article class="monument-card" id="card-${monument.id}">
          <div class="card-image-wrapper">
            <img 
              src="${monument.thumbnail}" 
              alt="${monument.name}" 
              class="card-image"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop'"
            />
            <span class="card-badge">3D Model Available</span>
          </div>

          <div class="card-body">
            <span class="card-location">📍 ${monument.location}</span>
            <h3 class="card-title">${monument.name}</h3>
            <p class="card-desc">${monument.shortDescription}</p>

            <div class="card-footer">
              <span class="card-era" style="font-size: 11px; color: #8C6B13; font-weight: 600;">
                🏛️ ${monument.architecture.style.split('&')[0]}
              </span>
              <a href="monument.html?id=${monument.id}" class="btn-explore">
                <span>Explore in 3D</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

  } catch (error) {
    console.error('[Virasat Frontend] Failed to fetch monuments:', error);
    
    // Hide loading indicator and reveal error banner
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    if (errorIndicator) {
      errorIndicator.style.display = 'block';
      errorIndicator.innerHTML = `
        <div style="background-color: #FEE2E2; border: 1px solid #EF4444; color: #991B1B; padding: 20px; border-radius: 8px; text-align: center;">
          <h4 style="font-size: 16px; margin-bottom: 8px;">⚠️ Could Not Connect to Virasat Server</h4>
          <p style="font-size: 13px;">Make sure the Express backend server is running with <code>npm start</code>.</p>
          <button onclick="loadMonumentsFromBackend()" style="margin-top: 12px; padding: 8px 16px; background-color: #991B1B; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
            Retry Connection
          </button>
        </div>
      `;
    }
  }
}
