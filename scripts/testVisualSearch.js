/**
 * VIRASAT — Automated Visual Search Test Suite (scripts/testVisualSearch.js)
 * 
 * Verifies:
 * 1. Visual Search UI elements in explore.html (camera button, modal, camera video, upload dropzone).
 * 2. POST /api/visual-search validation (file format, error handling).
 * 3. Architectural category and visual palette candidate matching (Taj Mahal, Ram Mandir, Caves, Forts).
 * 4. Transparent match reasons on candidate records.
 */

import http from 'http';

const BASE_URL = 'http://localhost:3000';

function getUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(payload);
    const req = http.request(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataStr)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) {}
        resolve({ statusCode: res.statusCode, body: data, json });
      });
    });

    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

async function runVisualSearchTests() {
  console.log('====================================================');
  console.log('   VIRASAT VISUAL SEARCH AUTOMATED TEST SUITE       ');
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

  // 1. UI Markup Checks on explore.html
  await test('Explore UI: Camera button and updated search bar placeholder', async () => {
    const res = await getUrl('/explore.html');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('camera-search-btn') || !res.body.includes('Search monuments, historical figures, or places...')) {
      throw new Error('Camera button or updated search placeholder missing in explore.html');
    }
    if (!res.body.includes('title="Search by photo"')) {
      throw new Error('Camera button tooltip missing title="Search by photo"');
    }
  });

  await test('Explore UI: Visual Search modal dialog & camera viewfinder elements', async () => {
    const res = await getUrl('/explore.html');
    const requiredIds = [
      'visual-search-modal',
      'tab-camera',
      'tab-upload',
      'camera-video',
      'btn-start-camera',
      'btn-capture-photo',
      'visual-file-input',
      'photo-preview-section',
      'visual-category-select',
      'visual-clue-input',
      'btn-find-monument',
      'visual-results-banner',
      'visual-empty-state'
    ];
    for (const id of requiredIds) {
      if (!res.body.includes(id)) {
        throw new Error(`Required visual search element #${id} missing in explore.html`);
      }
    }
  });

  await test('Explore UI: Native capture="environment" fallback present', async () => {
    const res = await getUrl('/explore.html');
    if (!res.body.includes('capture="environment"')) {
      throw new Error('Native capture="environment" attribute missing from visual-file-input');
    }
  });

  // 2. Backend API: POST /api/visual-search Validation
  await test('POST /api/visual-search: Invalid image format rejected (HTTP 400)', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: 'data:application/pdf;base64,badformat'
    });
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (!res.json || !res.json.message.includes('Invalid image format')) {
      throw new Error('Expected friendly invalid image format message');
    }
  });

  // A tiny valid 1x1 PNG base64 for testing
  const dummyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

  await test('POST /api/visual-search: Valid image upload accepted (HTTP 200)', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: dummyPng,
      category: 'all',
      clue: ''
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.json.success || !Array.isArray(res.json.data)) {
      throw new Error('Expected success true with candidates array');
    }
  });

  await test('POST /api/visual-search: White marble palette scores Taj Mahal', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: dummyPng,
      category: 'Tombs & Mausoleums',
      detectedPalette: 'white_marble'
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const taj = res.json.data.find(m => m.id === 'taj-mahal');
    if (!taj) throw new Error('Taj Mahal not in candidate list');
    if (!taj.matchReason || !taj.matchReason.includes('White Marble')) {
      throw new Error(`Expected White Marble match reason, got: ${taj.matchReason}`);
    }
  });

  await test('POST /api/visual-search: Clue "Ayodhya" scores Ram Mandir', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: dummyPng,
      clue: 'Ayodhya',
      category: 'all'
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const ram = res.json.data.find(m => m.id === 'ram-mandir');
    if (!ram) throw new Error('Ram Mandir not in candidate list');
    if (!ram.matchReason.includes('Ram Mandir') && !ram.matchReason.includes('Ayodhya') && !ram.matchReason.includes('Direct Name Reference')) {
      throw new Error(`Expected Ram Mandir/Ayodhya match reason, got: ${ram.matchReason}`);
    }
  });

  await test('POST /api/visual-search: Category "Ancient Caves" returns rock-cut monuments', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: dummyPng,
      category: 'Ancient Caves',
      detectedPalette: 'dark_rock'
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.json.data.length !== 2) throw new Error(`Expected 2 caves, got ${res.json.data.length}`);
    const names = res.json.data.map(m => m.id);
    if (!names.includes('ajanta-caves') || !names.includes('ellora-caves')) {
      throw new Error('Ajanta or Ellora Caves missing');
    }
  });

  await test('POST /api/visual-search: Red Sandstone palette matches Forts', async () => {
    const res = await postJson('/api/visual-search', {
      imageBase64: dummyPng,
      detectedPalette: 'red_sandstone',
      category: 'Forts & Palaces'
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const redFort = res.json.data.find(m => m.id === 'red-fort');
    if (!redFort) throw new Error('Red Fort missing from red sandstone fort matches');
  });

  await test('About Page: Includes Visual Search & Q11 in Viva Guide', async () => {
    const res = await getUrl('/about.html');
    if (!res.body.includes('Visual Search & Camera') || !res.body.includes('Q11: How does the Camera and Visual Search feature work')) {
      throw new Error('Visual search documentation or Q11 missing from about.html');
    }
  });

  console.log('\n====================================================');
  console.log(`  VISUAL SEARCH TEST RESULTS: ${passed} / ${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log('====================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

runVisualSearchTests();
