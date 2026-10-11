/**
 * VIRASAT — Automated Platform Verification Test (scripts/testPlatform.js)
 * 
 * Verifies all pages, API endpoints, search filters, and 3D binary assets.
 */

import http from 'http';

const BASE_URL = 'http://localhost:3000';

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      let bytes = 0;
      res.on('data', chunk => {
        bytes += chunk.length;
        if (data.length < 50000) data += chunk.toString();
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          totalBytes: bytes,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('   VIRASAT PLATFORM AUTOMATED VERIFICATION SUITE   ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    }
  }

  // 1. Pages Tests
  await test('Welcome Screen (GET /)', async () => {
    const res = await fetchUrl('/');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('VIRASAT') || !res.body.includes('Enter Virasat')) {
      throw new Error('Welcome page missing expected branding or Enter button');
    }
  });

  await test('Explore Dashboard (GET /explore.html)', async () => {
    const res = await fetchUrl('/explore.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('monument-search-input') || !res.body.includes('category-chips-container')) {
      throw new Error('Explore page missing search input or category chips');
    }
  });

  await test('Monument Details Template (GET /monument.html)', async () => {
    const res = await fetchUrl('/monument.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('<model-viewer') || !res.body.includes('section-3d-placeholder')) {
      throw new Error('Monument details page missing 3D viewer elements');
    }
  });

  await test('Historical Figures Directory (GET /figures.html)', async () => {
    const res = await fetchUrl('/figures.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('figures-grid') || !res.body.includes('Historical Figures')) {
      throw new Error('Figures page missing figures-grid');
    }
  });

  await test('Figure Profile Template (GET /figure.html)', async () => {
    const res = await fetchUrl('/figure.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('fig-biography') || !res.body.includes('fig-monuments-grid')) {
      throw new Error('Figure profile page missing biography or monuments container');
    }
  });

  await test('About & Viva Guide Page (GET /about.html)', async () => {
    const res = await fetchUrl('/about.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('Viva Defense Guide') || !res.body.includes('Q1: What is Virasat')) {
      throw new Error('About page missing viva defense guide');
    }
  });

  // 2. REST API: Monuments
  await test('REST API: GET /api/monuments (All 20 records)', async () => {
    const res = await fetchUrl('/api/monuments');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const json = JSON.parse(res.body);
    if (!json.success || json.count !== 20) throw new Error(`Expected 20 monuments, got ${json.count}`);
  });

  await test('REST API: Search "Taj"', async () => {
    const res = await fetchUrl('/api/monuments?search=Taj');
    const json = JSON.parse(res.body);
    if (json.count < 1 || !json.data.some(m => m.id === 'taj-mahal')) {
      throw new Error('Taj Mahal not found in search results');
    }
  });

  await test('REST API: Search "Ram Mandir"', async () => {
    const res = await fetchUrl('/api/monuments?search=Ram');
    const json = JSON.parse(res.body);
    if (json.count < 1 || !json.data.some(m => m.id === 'ram-mandir')) {
      throw new Error('Ram Mandir not found in search results');
    }
  });

  await test('REST API: Search Historical Figure Name "Shah Jahan"', async () => {
    const res = await fetchUrl('/api/monuments?search=Shah%20Jahan');
    const json = JSON.parse(res.body);
    if (json.count < 1 || !json.data.some(m => m.id === 'taj-mahal')) {
      throw new Error('Cross-figure search for Shah Jahan failed to return Taj Mahal');
    }
  });

  await test('REST API: Category Filter "Ancient Caves"', async () => {
    const res = await fetchUrl('/api/monuments?category=Ancient%20Caves');
    const json = JSON.parse(res.body);
    if (json.count !== 2) throw new Error(`Expected 2 cave monuments, got ${json.count}`);
  });

  await test('REST API: State Filter "Maharashtra"', async () => {
    const res = await fetchUrl('/api/monuments?state=Maharashtra');
    const json = JSON.parse(res.body);
    if (json.count < 3) throw new Error(`Expected at least 3 Maharashtra monuments, got ${json.count}`);
  });

  await test('REST API: UNESCO World Heritage Filter', async () => {
    const res = await fetchUrl('/api/monuments?unesco=true');
    const json = JSON.parse(res.body);
    if (json.count < 10) throw new Error(`Expected at least 10 UNESCO sites, got ${json.count}`);
  });

  await test('REST API: GET /api/monuments/taj-mahal with enriched figures', async () => {
    const res = await fetchUrl('/api/monuments/taj-mahal');
    const json = JSON.parse(res.body);
    if (!json.success || json.data.id !== 'taj-mahal') throw new Error('Failed to fetch taj-mahal');
    if (!json.data.hasModel || !json.data.modelPath) throw new Error('Taj Mahal must have 3D model flag');
    if (!json.data.resolvedFigures || json.data.resolvedFigures.length < 1) {
      throw new Error('Taj Mahal must have resolved historical figures (e.g., Shah Jahan)');
    }
  });

  await test('REST API: GET /api/monuments/ram-mandir with verified 3D', async () => {
    const res = await fetchUrl('/api/monuments/ram-mandir');
    const json = JSON.parse(res.body);
    if (!json.success || json.data.id !== 'ram-mandir') throw new Error('Failed to fetch ram-mandir');
    if (!json.data.hasModel || !json.data.modelPath) throw new Error('Ram Mandir must have 3D model flag');
  });

  // 3. REST API: Historical Figures
  await test('REST API: GET /api/figures (All 10 figures)', async () => {
    const res = await fetchUrl('/api/figures');
    const json = JSON.parse(res.body);
    if (!json.success || json.count !== 10) throw new Error(`Expected 10 figures, got ${json.count}`);
  });

  await test('REST API: Search Figure "Shivaji"', async () => {
    const res = await fetchUrl('/api/figures?search=Shivaji');
    const json = JSON.parse(res.body);
    if (json.count !== 1 || json.data[0].id !== 'chhatrapati-shivaji-maharaj') {
      throw new Error('Chhatrapati Shivaji not returned');
    }
  });

  await test('REST API: GET /api/figures/shah-jahan with resolved monuments', async () => {
    const res = await fetchUrl('/api/figures/shah-jahan');
    const json = JSON.parse(res.body);
    if (!json.success || json.data.id !== 'shah-jahan') throw new Error('Failed to fetch Shah Jahan');
    if (!json.data.resolvedMonuments || json.data.resolvedMonuments.length < 2) {
      throw new Error('Expected resolved monuments for Shah Jahan (Taj Mahal, Red Fort, Agra Fort)');
    }
  });

  // 4. REST API: Categories
  await test('REST API: GET /api/categories metadata', async () => {
    const res = await fetchUrl('/api/categories');
    const json = JSON.parse(res.body);
    if (!json.success || json.categories.length < 5 || json.states.length < 5) {
      throw new Error('Categories or states aggregation failed');
    }
    if (json.modelsCount !== 2) {
      throw new Error(`Expected exactly 2 working 3D models (Taj Mahal & Ram Mandir), got ${json.modelsCount}`);
    }
  });

  // 5. 3D GLB Binary Asset Downloads
  await test('3D Asset: /models/taj-mahal.glb exists and is binary glTF', async () => {
    const res = await fetchUrl('/models/taj-mahal.glb');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.totalBytes < 100000) throw new Error(`Model size too small (${res.totalBytes} bytes)`);
  });

  await test('3D Asset: /models/ram-mandir.glb exists and is binary glTF', async () => {
    const res = await fetchUrl('/models/ram-mandir.glb');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.totalBytes < 100000) throw new Error(`Model size too small (${res.totalBytes} bytes)`);
  });

  console.log('\n====================================================');
  console.log(`  TEST RESULTS: ${passed} / ${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log('====================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
