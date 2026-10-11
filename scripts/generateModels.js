/**
 * VIRASAT - 3D GLB Model Generator
 * 
 * Generates genuine 3D binary .glb models for:
 * 1. public/models/taj-mahal.glb
 * 2. public/models/ram-mandir.glb
 * 
 * Uses Three.js and GLTFExporter.
 */

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modelsDir = path.join(__dirname, '..', 'public', 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Polyfill FileReader for Node.js environment
global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = 'data:application/octet-stream;base64,' + Buffer.from(buf).toString('base64');
      if (this.onloadend) this.onloadend();
    });
  }
};

// Helper to save a Three.js scene as a .glb file
function exportSceneToGLB(scene, outputPath, monumentName) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (glb) => {
        const buffer = Buffer.from(glb);
        fs.writeFileSync(outputPath, buffer);
        console.log(`[Virasat 3D] Generated ${monumentName} -> ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
        resolve();
      },
      (error) => {
        console.error(`[Virasat 3D] Error exporting ${monumentName}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

// -------------------------------------------------------------
// 1. GENERATE TAJ MAHAL 3D MODEL
// -------------------------------------------------------------
function buildTajMahalScene() {
  const scene = new THREE.Scene();

  // Materials
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xfaf8f5,
    roughness: 0.2,
    metalness: 0.05
  });

  const marbleDarkMat = new THREE.MeshStandardMaterial({
    color: 0xede6dc,
    roughness: 0.3,
    metalness: 0.05
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.3,
    metalness: 0.8
  });

  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x8a382c,
    roughness: 0.8,
    metalness: 0.02
  });

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1a485c,
    roughness: 0.1,
    metalness: 0.6
  });

  // Base Red Sandstone Courtyard
  const courtyard = new THREE.Mesh(
    new THREE.BoxGeometry(32, 0.4, 32),
    sandstoneMat
  );
  courtyard.position.y = 0.2;
  scene.add(courtyard);

  // Central Reflecting Pool
  const pool = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.42, 28),
    waterMat
  );
  pool.position.set(0, 0.22, 0);
  scene.add(pool);

  // Raised White Marble Plinth
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(16, 1.2, 16),
    marbleDarkMat
  );
  plinth.position.y = 1.0;
  scene.add(plinth);

  // Plinth Upper Step
  const upperPlinth = new THREE.Mesh(
    new THREE.BoxGeometry(15, 0.4, 15),
    marbleMat
  );
  upperPlinth.position.y = 1.8;
  scene.add(upperPlinth);

  // Central Mausoleum Body (Square with chamfered corners)
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(8, 5.5, 8),
    marbleMat
  );
  body.position.y = 4.75;
  scene.add(body);

  // 4 Grand Entrance Arches (Pishtaq Facades)
  const archOffsets = [
    { x: 0, z: 4.05, rot: 0 },
    { x: 0, z: -4.05, rot: Math.PI },
    { x: 4.05, z: 0, rot: Math.PI / 2 },
    { x: -4.05, z: 0, rot: -Math.PI / 2 }
  ];

  archOffsets.forEach(pos => {
    // Outer Arch Frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 5.2, 0.3),
      marbleDarkMat
    );
    frame.position.set(pos.x, 4.8, pos.z);
    frame.rotation.y = pos.rot;
    scene.add(frame);

    // Inner Recessed Niche
    const niche = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 3.2, 16, 1, false, 0, Math.PI),
      marbleDarkMat
    );
    niche.position.set(pos.x, 5.2, pos.z);
    niche.rotation.y = pos.rot + Math.PI / 2;
    scene.add(niche);
  });

  // Central Dome Drum (Cylinder base)
  const domeDrum = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 2.7, 1.6, 32),
    marbleDarkMat
  );
  domeDrum.position.y = 8.3;
  scene.add(domeDrum);

  // Central Bulbous Onion Dome (Amrud)
  const domeGeometry = new THREE.SphereGeometry(2.7, 32, 24);
  domeGeometry.scale(1.0, 1.35, 1.0);
  const dome = new THREE.Mesh(domeGeometry, marbleMat);
  dome.position.y = 10.4;
  scene.add(dome);

  // Central Dome Spire (Kalash Finial)
  const spire = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 1.8, 16),
    goldMat
  );
  spire.position.y = 14.2;
  scene.add(spire);

  // 4 Chhatris (Corner roof kiosks)
  const chhatriOffsets = [
    { x: 2.8, z: 2.8 },
    { x: -2.8, z: 2.8 },
    { x: 2.8, z: -2.8 },
    { x: -2.8, z: -2.8 }
  ];

  chhatriOffsets.forEach(c => {
    // 4 pillars for each chhatri
    const pillars = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8),
      marbleMat
    );
    pillars.position.set(c.x, 8.1, c.z);
    scene.add(pillars);

    // Chhatri small dome
    const smDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 12),
      marbleMat
    );
    smDome.scale.set(1.0, 1.1, 1.0);
    smDome.position.set(c.x, 8.9, c.z);
    scene.add(smDome);

    // Chhatri finial
    const smSpire = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.5, 8),
      goldMat
    );
    smSpire.position.set(c.x, 9.8, c.z);
    scene.add(smSpire);
  });

  // 4 Corner Minarets
  const minaretOffsets = [
    { x: 6.8, z: 6.8 },
    { x: -6.8, z: 6.8 },
    { x: 6.8, z: -6.8 },
    { x: -6.8, z: -6.8 }
  ];

  minaretOffsets.forEach(m => {
    // Octagonal base
    const mBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.0, 1.2, 8),
      marbleDarkMat
    );
    mBase.position.set(m.x, 2.4, m.z);
    scene.add(mBase);

    // Tier 1 Shaft
    const tier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.78, 3.4, 16),
      marbleMat
    );
    tier1.position.set(m.x, 4.6, m.z);
    scene.add(tier1);

    // Balcony 1
    const b1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.65, 0.35, 16),
      marbleDarkMat
    );
    b1.position.set(m.x, 6.4, m.z);
    scene.add(b1);

    // Tier 2 Shaft
    const tier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.66, 3.2, 16),
      marbleMat
    );
    tier2.position.set(m.x, 8.1, m.z);
    scene.add(tier2);

    // Balcony 2
    const b2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.55, 0.35, 16),
      marbleDarkMat
    );
    b2.position.set(m.x, 9.8, m.z);
    scene.add(b2);

    // Tier 3 Shaft
    const tier3 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.55, 2.8, 16),
      marbleMat
    );
    tier3.position.set(m.x, 11.3, m.z);
    scene.add(tier3);

    // Top Balcony
    const b3 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.45, 0.35, 16),
      marbleDarkMat
    );
    b3.position.set(m.x, 12.8, m.z);
    scene.add(b3);

    // Minaret Chhatri Kiosk
    const mCupola = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 12),
      marbleMat
    );
    mCupola.position.set(m.x, 13.4, m.z);
    scene.add(mCupola);

    // Minaret Finial
    const mFinial = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.6, 8),
      goldMat
    );
    mFinial.position.set(m.x, 14.1, m.z);
    scene.add(mFinial);
  });

  return scene;
}

// -------------------------------------------------------------
// 2. GENERATE SHRI RAM JANMABHOOMI MANDIR 3D MODEL
// -------------------------------------------------------------
function buildRamMandirScene() {
  const scene = new THREE.Scene();

  // Materials: Pink Bansi Paharpur sandstone
  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: 0xd9826c,
    roughness: 0.65,
    metalness: 0.04
  });

  const sandstoneDarkMat = new THREE.MeshStandardMaterial({
    color: 0xb8634e,
    roughness: 0.75,
    metalness: 0.04
  });

  const goldKalashMat = new THREE.MeshStandardMaterial({
    color: 0xe5c158,
    roughness: 0.25,
    metalness: 0.85
  });

  const flagMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.3,
    metalness: 0.1
  });

  const courtyardStoneMat = new THREE.MeshStandardMaterial({
    color: 0xa8533e,
    roughness: 0.85,
    metalness: 0.02
  });

  // Base Temple Compound (Jagati Platform)
  const compound = new THREE.Mesh(
    new THREE.BoxGeometry(34, 0.4, 24),
    courtyardStoneMat
  );
  compound.position.y = 0.2;
  scene.add(compound);

  // Raised Multi-tiered Jagati Platform
  const jagati1 = new THREE.Mesh(
    new THREE.BoxGeometry(26, 0.8, 16),
    sandstoneDarkMat
  );
  jagati1.position.y = 0.8;
  scene.add(jagati1);

  const jagati2 = new THREE.Mesh(
    new THREE.BoxGeometry(24, 0.6, 14),
    sandstoneMat
  );
  jagati2.position.y = 1.5;
  scene.add(jagati2);

  // Singh Dwar (Grand Eastern Entrance Steps)
  for (let s = 0; s < 6; s++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(6 - s * 0.4, 0.25, 0.8),
      sandstoneDarkMat
    );
    step.position.set(13.2 - s * 0.4, 0.25 + s * 0.25, 0);
    scene.add(step);
  }

  // --- GARBHAGRIHA (Sanctum Sanctorum at West End) ---
  const garbhagrihaBase = new THREE.Mesh(
    new THREE.BoxGeometry(7, 4.5, 7),
    sandstoneMat
  );
  garbhagrihaBase.position.set(-7, 4.05, 0);
  scene.add(garbhagrihaBase);

  // Carved Pilasters on Garbhagriha
  for (let angle = 0; angle < 4; angle++) {
    const pilaster = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 4.8, 1.2),
      sandstoneDarkMat
    );
    const px = -7 + (angle < 2 ? 3.3 : -3.3);
    const pz = angle % 2 === 0 ? 3.3 : -3.3;
    pilaster.position.set(px, 4.1, pz);
    scene.add(pilaster);
  }

  // Multi-tier Nagara Shikhar Spire over Garbhagriha
  // Tier 1 Urushringa
  const sTier1 = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8, 3.4, 3.2, 16),
    sandstoneDarkMat
  );
  sTier1.position.set(-7, 7.8, 0);
  scene.add(sTier1);

  // Tier 2 Middle Shikhar
  const sTier2 = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.8, 3.5, 16),
    sandstoneMat
  );
  sTier2.position.set(-7, 11.0, 0);
  scene.add(sTier2);

  // Tier 3 Soaring Taper
  const sTier3 = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 2.0, 3.8, 16),
    sandstoneDarkMat
  );
  sTier3.position.set(-7, 14.5, 0);
  scene.add(sTier3);

  // Griva (Neck)
  const griva = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 0.95, 0.6, 16),
    sandstoneMat
  );
  griva.position.set(-7, 16.6, 0);
  scene.add(griva);

  // Amalaka (Fluted Stone Disc)
  const amalaka = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.6, 0.65, 24),
    sandstoneDarkMat
  );
  amalaka.position.set(-7, 17.2, 0);
  scene.add(amalaka);

  // Gold Kalash (Finial)
  const kalashBase = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 16, 12),
    goldKalashMat
  );
  kalashBase.position.set(-7, 18.0, 0);
  scene.add(kalashBase);

  const kalashSpire = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 1.2, 12),
    goldKalashMat
  );
  kalashSpire.position.set(-7, 19.0, 0);
  scene.add(kalashSpire);

  // Saffron Dhwaja (Sacred Flag)
  const flag = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.8, 1.2),
    flagMat
  );
  flag.position.set(-7, 19.3, 0.7);
  scene.add(flag);

  // --- FIVE AXIAL MANDAPAS ---
  // (1) Gudu / Antarala Mandap, (2) Rang Mandap, (3) Sabha Mandap, (4) Nritya Mandap, (5) Prarthana Mandap
  const mandapas = [
    { name: 'Rang Mandap', x: -2.5, width: 5.5, depth: 5.5, height: 3.8, roofH: 2.8, roofW: 2.2 },
    { name: 'Sabha Mandap', x: 2.0, width: 5.2, depth: 5.2, height: 3.6, roofH: 2.5, roofW: 2.0 },
    { name: 'Nritya Mandap', x: 6.2, width: 4.8, depth: 4.8, height: 3.4, roofH: 2.2, roofW: 1.8 },
    { name: 'Prarthana Mandap', x: 9.8, width: 4.2, depth: 4.2, height: 3.2, roofH: 1.8, roofW: 1.5 }
  ];

  mandapas.forEach(m => {
    // Mandapa Pavilion Body
    const mBody = new THREE.Mesh(
      new THREE.BoxGeometry(m.width, m.height, m.depth),
      sandstoneMat
    );
    mBody.position.set(m.x, 1.8 + m.height / 2, 0);
    scene.add(mBody);

    // Pyramidal Tiered Samvarana Roof
    const roof1 = new THREE.Mesh(
      new THREE.CylinderGeometry(m.roofW * 0.7, m.width * 0.6, 1.2, 4),
      sandstoneDarkMat
    );
    roof1.position.set(m.x, 1.8 + m.height + 0.6, 0);
    roof1.rotation.y = Math.PI / 4;
    scene.add(roof1);

    const roof2 = new THREE.Mesh(
      new THREE.CylinderGeometry(m.roofW * 0.3, m.roofW * 0.7, 1.0, 4),
      sandstoneMat
    );
    roof2.position.set(m.x, 1.8 + m.height + 1.6, 0);
    roof2.rotation.y = Math.PI / 4;
    scene.add(roof2);

    // Mandapa Kalash Finial
    const mKalash = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 10),
      goldKalashMat
    );
    mKalash.position.set(m.x, 1.8 + m.height + 2.3, 0);
    scene.add(mKalash);
  });

  // Pillar Colonnades along the sides
  const pillarXPositions = [-5, -2.5, 0, 2.5, 5, 7.5, 10];
  const pillarZPositions = [3.8, -3.8];

  pillarXPositions.forEach(px => {
    pillarZPositions.forEach(pz => {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.28, 3.8, 12),
        sandstoneDarkMat
      );
      pillar.position.set(px, 3.7, pz);
      scene.add(pillar);

      // Pillar capital bracket
      const capital = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.3, 0.7),
        sandstoneMat
      );
      capital.position.set(px, 5.7, pz);
      scene.add(capital);
    });
  });

  return scene;
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------
async function run() {
  console.log('[Virasat 3D] Starting genuine 3D model generation...');

  const tajScene = buildTajMahalScene();
  await exportSceneToGLB(
    tajScene,
    path.join(modelsDir, 'taj-mahal.glb'),
    'Taj Mahal'
  );

  const ramScene = buildRamMandirScene();
  await exportSceneToGLB(
    ramScene,
    path.join(modelsDir, 'ram-mandir.glb'),
    'Shri Ram Mandir'
  );

  console.log('[Virasat 3D] All 3D .glb models generated successfully!');
}

run().catch(err => {
  console.error('[Virasat 3D] Model generation failed:', err);
  process.exit(1);
});
