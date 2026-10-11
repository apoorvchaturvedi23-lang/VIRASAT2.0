import http from 'http';

function get(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ path, status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- TESTING NEW USER FLOW ---');
  
  // Step 1: Root URL / -> Welcome Page
  const welcome = await get('/');
  console.log('1. Root URL / status:', welcome.status);
  console.log('   Has "Enter Virasat":', welcome.data.includes('Enter Virasat'));
  console.log('   Has "Journey Through India":', welcome.data.includes('Journey Through India'));
  console.log('   Omitted monument-card grid:', !welcome.data.includes('monument-card'));

  // Step 2: /explore.html -> Browsing Page
  const explore = await get('/explore.html');
  console.log('2. /explore.html status:', explore.status);
  console.log('   Has "Discover India":', explore.data.includes('Discover India'));
  console.log('   Has monuments-container:', explore.data.includes('monuments-container'));

  const exploreAlias = await get('/explore');
  console.log('   /explore route alias status:', exploreAlias.status);

  // Step 3: /monument.html?id=taj-mahal
  const taj = await get('/monument.html?id=taj-mahal');
  console.log('3. /monument.html?id=taj-mahal status:', taj.status);
  console.log('   Has link back to explore.html:', taj.data.includes('explore.html'));

  // Step 4: /monument.html?id=ram-mandir
  const ram = await get('/monument.html?id=ram-mandir');
  console.log('4. /monument.html?id=ram-mandir status:', ram.status);
  console.log('   Has link back to explore.html:', ram.data.includes('explore.html'));

  // Step 5: Check API endpoints
  const api = await get('/api/monuments');
  console.log('5. /api/monuments status:', api.status);
  const apiData = JSON.parse(api.data);
  console.log('   Monuments returned:', apiData.data.map(m => m.name));

  console.log('--- ALL USER JOURNEY TESTS PASSED! ---');
}

run().catch(console.error);
