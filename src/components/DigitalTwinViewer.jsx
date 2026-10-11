import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, 
  RotateCw, 
  Sliders, 
  Download,
  Compass,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info,
  X,
  HelpCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function DigitalTwinViewer({ selectedSite, onSelectSite }) {
  const tajMahalSite = HERITAGE_SITES.find(s => s.id === 'site-006') || HERITAGE_SITES[0];
  const site = selectedSite || tajMahalSite;

  const [temporalYear, setTemporalYear] = useState(2026);
  const [renderMode, setRenderMode] = useState('photorealistic'); // 'photorealistic' | 'wireframe'
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [cameraViewName, setCameraViewName] = useState('Three-Quarter View');

  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

  // Hotspots Dataset
  const TAJ_PARTS = [
    {
      id: 'dome',
      name: 'Main Onion Dome (Amrud)',
      shortDesc: 'The 35-meter tall central marble dome topped with a lotus motif and brass finial spire.',
      details: 'Crafted from translucent white Makrana marble. Its unique onion shape is emphasized by four smaller dome chhatris surrounding it.',
      camPos: { x: 0, y: 16, z: 14 },
      target: { x: 0, y: 12, z: 0 }
    },
    {
      id: 'entrance',
      name: 'Main Entrance Arch (Pishtaq)',
      shortDesc: 'The grand vaulted entrance archway inscribed with Quranic calligraphic verses in black marble.',
      details: 'Stands 33 meters high. The calligraphic script increases slightly in size towards the top so it appears uniform from the ground.',
      camPos: { x: 0, y: 6, z: 12 },
      target: { x: 0, y: 4, z: 0 }
    },
    {
      id: 'minarets',
      name: '4 Corner Minarets',
      shortDesc: 'Four 40-meter tall marble towers standing at the corners of the main platform.',
      details: 'Engineered with a subtle 2-degree outward tilt so that in the event of an earthquake, they fall away from the main tomb.',
      camPos: { x: 18, y: 10, z: 18 },
      target: { x: 10, y: 6, z: -10 }
    },
    {
      id: 'plinth',
      name: 'Marble Base Platform (Plinth)',
      shortDesc: 'A raised square marble platform 7 meters high, protecting the main structure from Yamuna river floods.',
      details: 'Built over wooden bull-sal wells filled with stone and mortar, creating an ancient earthquake-resistant foundation.',
      camPos: { x: 14, y: 5, z: 14 },
      target: { x: 0, y: 1, z: 0 }
    },
    {
      id: 'pool',
      name: 'Reflecting Pool & Charbagh Gardens',
      shortDesc: 'The central lotus water pool that creates a flawless mirror reflection of the Taj Mahal.',
      details: 'Based on the Persian Charbagh four-fold garden layout symbolizing the four rivers of paradise.',
      camPos: { x: 0, y: 12, z: 24 },
      target: { x: 0, y: 0, z: 10 }
    }
  ];

  // Camera Quick Preset Locations
  const CAMERA_PRESETS = [
    { name: 'Three-Quarter View', pos: { x: 18, y: 14, z: 22 }, target: { x: 0, y: 4, z: 0 } },
    { name: 'Front View', pos: { x: 0, y: 6, z: 24 }, target: { x: 0, y: 4, z: 0 } },
    { name: 'Back View', pos: { x: 0, y: 6, z: -24 }, target: { x: 0, y: 4, z: 0 } },
    { name: 'Left Side', pos: { x: -24, y: 6, z: 0 }, target: { x: 0, y: 4, z: 0 } },
    { name: 'Right Side', pos: { x: 24, y: 6, z: 0 }, target: { x: 0, y: 4, z: 0 } },
    { name: 'Top View', pos: { x: 0, y: 32, z: 1 }, target: { x: 0, y: 4, z: 0 } }
  ];

  // Guided Tour Step Controller
  useEffect(() => {
    if (isTourActive) {
      const part = TAJ_PARTS[tourStepIndex];
      setSelectedPart(part);
      setIsAutoRotating(false);
      animateCameraTo(part.camPos, part.target);
    }
  }, [isTourActive, tourStepIndex]);

  // Smooth Camera Animation
  const animateCameraTo = (pos, target) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const endPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    const endTarget = new THREE.Vector3(target.x, target.y, target.z);

    let progress = 0;
    const animateStep = () => {
      progress += 0.05;
      if (progress <= 1) {
        camera.position.lerpVectors(startPos, endPos, progress);
        controls.target.lerpVectors(startTarget, endTarget, progress);
        controls.update();
        requestAnimationFrame(animateStep);
      } else {
        camera.position.copy(endPos);
        controls.target.copy(endTarget);
        controls.update();
      }
    };
    animateStep();
  };

  // Reset Camera View
  const handleResetView = () => {
    setIsTourActive(false);
    setSelectedPart(null);
    setCameraViewName('Three-Quarter View');
    animateCameraTo(CAMERA_PRESETS[0].pos, CAMERA_PRESETS[0].target);
  };

  // Select Preset Camera View
  const handleSelectPreset = (preset) => {
    setCameraViewName(preset.name);
    setIsAutoRotating(false);
    animateCameraTo(preset.pos, preset.target);
  };

  // Select Part Function
  const handleSelectPart = (part) => {
    setSelectedPart(part);
    setIsAutoRotating(false);
    animateCameraTo(part.camPos, part.target);
  };

  // Initialize Three.js WebGL 3D Taj Mahal Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b132b');

    // Soft fog for realistic atmospheric depth
    scene.fog = new THREE.FogExp2('#0b132b', 0.015);

    // 2. Camera setup (Initial Three-Quarter View)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(18, 14, 22);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent camera from going under ground
    controls.minDistance = 6;
    controls.maxDistance = 50;
    controls.target.set(0, 4, 0);
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    // 5. Lighting Setup (Sunlight + Ambient + Fill Light)
    const ambientLight = new THREE.AmbientLight('#93c5fd', 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#fff8e7', 1.4);
    sunLight.position.set(20, 30, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight('#fde68a', 0.4);
    fillLight.position.set(-20, 15, -20);
    scene.add(fillLight);

    // 6. Materials (White Marble PBR Materials)
    const marbleMaterial = new THREE.MeshStandardMaterial({
      color: '#fdfbf7',
      roughness: 0.25,
      metalness: 0.05,
      wireframe: renderMode === 'wireframe'
    });

    const darkMarbleMaterial = new THREE.MeshStandardMaterial({
      color: '#334155',
      roughness: 0.4,
      metalness: 0.1,
      wireframe: renderMode === 'wireframe'
    });

    const goldSpireMaterial = new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      roughness: 0.2,
      metalness: 0.8,
      wireframe: renderMode === 'wireframe'
    });

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85
    });

    const gardenMaterial = new THREE.MeshStandardMaterial({
      color: '#064e3b',
      roughness: 0.8,
      metalness: 0.0
    });

    // 7. Complete Taj Mahal 3D Geometry Assembly Group
    const tajGroup = new THREE.Group();

    // A. Garden Base & Reflection Pool
    const gardenGeo = new THREE.PlaneGeometry(60, 60);
    const gardenMesh = new THREE.Mesh(gardenGeo, gardenMaterial);
    gardenMesh.rotation.x = -Math.PI / 2;
    gardenMesh.position.y = -0.05;
    gardenMesh.receiveShadow = true;
    tajGroup.add(gardenMesh);

    // Pool Strip
    const poolGeo = new THREE.PlaneGeometry(8, 25);
    const poolMesh = new THREE.Mesh(poolGeo, waterMaterial);
    poolMesh.rotation.x = -Math.PI / 2;
    poolMesh.position.set(0, 0.01, 15);
    tajGroup.add(poolMesh);

    // B. Red Sandstone Lower Terrace Base
    const terraceGeo = new THREE.BoxGeometry(32, 0.8, 32);
    const terraceMat = new THREE.MeshStandardMaterial({ color: '#7c2d12', roughness: 0.6 });
    const terraceMesh = new THREE.Mesh(terraceGeo, terraceMat);
    terraceMesh.position.y = 0.4;
    terraceMesh.receiveShadow = true;
    tajGroup.add(terraceMesh);

    // C. Main White Marble Raised Plinth (Platform)
    const plinthGeo = new THREE.BoxGeometry(26, 1.6, 26);
    const plinthMesh = new THREE.Mesh(plinthGeo, marbleMaterial);
    plinthMesh.position.y = 1.6;
    plinthMesh.castShadow = true;
    plinthMesh.receiveShadow = true;
    tajGroup.add(plinthMesh);

    // D. Main Octagonal Tomb Body (Chamfered Corner Box)
    const tombShape = new THREE.Shape();
    const mw = 7;
    const ch = 3;
    tombShape.moveTo(-mw + ch, -mw);
    tombShape.lineTo(mw - ch, -mw);
    tombShape.lineTo(mw, -mw + ch);
    tombShape.lineTo(mw, mw - ch);
    tombShape.lineTo(mw - ch, mw);
    tombShape.lineTo(-mw + ch, mw);
    tombShape.lineTo(-mw, mw - ch);
    tombShape.lineTo(-mw, -mw + ch);
    tombShape.closePath();

    const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.2, bevelThickness: 0.2 };
    const tombGeo = new THREE.ExtrudeGeometry(tombShape, extrudeSettings);
    const tombMesh = new THREE.Mesh(tombGeo, marbleMaterial);
    tombMesh.rotation.x = Math.PI / 2;
    tombMesh.position.set(0, 10.4, 0);
    tombMesh.castShadow = true;
    tombMesh.receiveShadow = true;
    tajGroup.add(tombMesh);

    // E. 4 Grand Arch Facades (Pishtaq Archways - Front, Back, Left, Right)
    const archPositions = [
      { x: 0, z: 6.9, rotY: 0 },
      { x: 0, z: -6.9, rotY: Math.PI },
      { x: 6.9, z: 0, rotY: Math.PI / 2 },
      { x: -6.9, z: 0, rotY: -Math.PI / 2 }
    ];

    archPositions.forEach(ap => {
      const archFrame = new THREE.Mesh(new THREE.BoxGeometry(6, 6.5, 0.4), darkMarbleMaterial);
      archFrame.position.set(ap.x, 6, ap.z);
      archFrame.rotation.y = ap.rotY;
      tajGroup.add(archFrame);

      const archNiche = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 5.5, 16, 1, false, 0, Math.PI), darkMarbleMaterial);
      archNiche.position.set(ap.x, 5.8, ap.z + (ap.rotY === 0 ? -0.1 : (ap.rotY === Math.PI ? 0.1 : 0)));
      archNiche.rotation.y = ap.rotY;
      tajGroup.add(archNiche);
    });

    // F. Main Central Onion Dome (Amrud) & Drum Base
    const drumGeo = new THREE.CylinderGeometry(4.2, 4.2, 3, 32);
    const drumMesh = new THREE.Mesh(drumGeo, marbleMaterial);
    drumMesh.position.y = 11.9;
    drumMesh.castShadow = true;
    tajGroup.add(drumMesh);

    // Bulbous Onion Dome Geometry
    const domeGeo = new THREE.SphereGeometry(4.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const domeMesh = new THREE.Mesh(domeGeo, marbleMaterial);
    domeMesh.position.y = 15;
    domeMesh.scale.set(1, 1.25, 1);
    domeMesh.castShadow = true;
    tajGroup.add(domeMesh);

    // Dome Lotus Collar & Spire Finial
    const spireGeo = new THREE.CylinderGeometry(0.1, 0.4, 3, 16);
    const spireMesh = new THREE.Mesh(spireGeo, goldSpireMaterial);
    spireMesh.position.y = 21;
    tajGroup.add(spireMesh);

    const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), goldSpireMaterial);
    finialBall.position.y = 22.2;
    tajGroup.add(finialBall);

    // G. 4 Corner Kiosk Domes (Chhatris)
    const chhatriLocs = [
      { x: -4.8, z: -4.8 },
      { x: 4.8, z: -4.8 },
      { x: 4.8, z: 4.8 },
      { x: -4.8, z: 4.8 }
    ];

    chhatriLocs.forEach(c => {
      // Pillars
      for (let p = 0; p < 4; p++) {
        const angle = (p * Math.PI) / 2;
        const px = c.x + Math.cos(angle) * 1.1;
        const pz = c.z + Math.sin(angle) * 1.1;
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.8, 8), marbleMaterial);
        pillar.position.set(px, 11.8, pz);
        tajGroup.add(pillar);
      }

      // Small Dome Cap
      const cDome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6), marbleMaterial);
      cDome.position.set(c.x, 14, c.z);
      cDome.castShadow = true;
      tajGroup.add(cDome);
    });

    // H. 4 Corner Minarets (Full 3D Shafts & Balconies)
    const minaretLocs = [
      { x: -11.5, z: -11.5 },
      { x: 11.5, z: -11.5 },
      { x: 11.5, z: 11.5 },
      { x: -11.5, z: 11.5 }
    ];

    minaretLocs.forEach(m => {
      // Base Octagonal Pedestal
      const mBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 2, 8), marbleMaterial);
      mBase.position.set(m.x, 3.4, m.z);
      mBase.castShadow = true;
      tajGroup.add(mBase);

      // Tapered Shaft
      const mShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 13, 16), marbleMaterial);
      mShaft.position.set(m.x, 10.9, m.z);
      mShaft.castShadow = true;
      tajGroup.add(mShaft);

      // 2 Balcony Rings
      [7, 12].forEach(by => {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.4, 16), marbleMaterial);
        ring.position.set(m.x, by, m.z);
        tajGroup.add(ring);
      });

      // Top Chhatri Kiosk
      const mChhatri = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6), marbleMaterial);
      mChhatri.position.set(m.x, 18, m.z);
      mChhatri.castShadow = true;
      tajGroup.add(mChhatri);
    });

    scene.add(tajGroup);

    // 8. Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.autoRotate = isAutoRotating;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize listener
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [renderMode]);

  // Update Auto-Rotation state dynamically
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Virasat — Complete 3D Taj Mahal Model</h1>
          </div>
          <p className="text-xs text-slate-300">Inspect the complete Taj Mahal complex in 3D: rotate 360°, zoom, and view all four sides</p>
        </div>

        {/* Start Tour Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isTourActive) {
                setIsTourActive(false);
                setSelectedPart(null);
              } else {
                setIsTourActive(true);
                setTourStepIndex(0);
              }
            }}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow ${
              isTourActive
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isTourActive ? 'End Virtual Tour' : 'Start Guided Virtual Tour'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport & Interactive Hotspots Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Large 3D Viewport */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl">
            
            {/* Three.js Canvas Container */}
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>

            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              
              {/* Compass & View Badge Top Left */}
              <div className="flex items-center justify-between">
                <div className="bg-[#1E0609]/90 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg text-xs text-[#D4AF37] font-serif-royal font-semibold flex items-center gap-2 shadow pointer-events-auto">
                  <Compass className="w-4 h-4 text-[#F59E0B]" />
                  <span>3D VIEW: {cameraViewName.toUpperCase()}</span>
                </div>

                {/* Reset View & Zoom Controls Top Right */}
                <div className="flex items-center gap-1 bg-[#1E0609]/90 border border-[#D4AF37]/30 p-1 rounded-lg shadow pointer-events-auto">
                  <button
                    onClick={handleResetView}
                    className="px-2.5 py-1 text-xs font-serif-royal font-semibold bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] rounded border border-[#D4AF37]/30"
                    title="Reset View to Default Perspective"
                  >
                    Reset View
                  </button>
                  <button
                    onClick={() => {
                      if (cameraRef.current && controlsRef.current) {
                        cameraRef.current.position.multiplyScalar(0.85);
                        controlsRef.current.update();
                      }
                    }}
                    className="p-1.5 text-[#E5C158] hover:text-white rounded hover:bg-[#3D0F14]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (cameraRef.current && controlsRef.current) {
                        cameraRef.current.position.multiplyScalar(1.15);
                        controlsRef.current.update();
                      }
                    }}
                    className="p-1.5 text-[#E5C158] hover:text-white rounded hover:bg-[#3D0F14]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className={`px-2 py-1 rounded text-xs font-serif-royal font-semibold flex items-center gap-1 transition-colors ${
                      isAutoRotating ? 'bg-[#D97706] text-white' : 'bg-[#3D0F14] text-[#E5C158] hover:text-white'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isAutoRotating ? 'Auto Rotate' : 'Manual Drag'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Camera Preset Buttons Center Floating */}
              <div className="flex flex-wrap gap-1.5 pointer-events-auto justify-center">
                {CAMERA_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif-royal font-medium transition-all shadow ${
                      cameraViewName === preset.name
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-bold border border-[#D4AF37]'
                        : 'bg-[#1E0609]/90 hover:bg-[#3D0F14] text-[#E5C158] border border-[#D4AF37]/30'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Interactive Hotspot Buttons Bottom */}
              <div className="flex flex-wrap gap-2 pointer-events-auto justify-center">
                {TAJ_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    className={`px-3 py-1 rounded-full text-xs font-serif-royal font-semibold transition-all shadow-lg ${
                      selectedPart?.id === part.id
                        ? 'bg-[#D4AF37] text-[#1E0609] ring-2 ring-[#F5E5AD] font-bold scale-105'
                        : 'bg-[#1E0609]/90 hover:bg-[#4A0F17] text-[#FFFDF5] border border-[#D4AF37]/40'
                    }`}
                  >
                    📍 {part.name}
                  </button>
                ))}
              </div>

              {/* Render Mode Selector Bottom Center */}
              <div className="self-center bg-[#1E0609]/90 border border-[#D4AF37]/30 p-1 rounded-lg flex items-center gap-1 pointer-events-auto shadow-lg">
                <button
                  onClick={() => setRenderMode('photorealistic')}
                  className={`px-3 py-1 rounded text-xs font-serif-royal font-semibold transition-colors ${
                    renderMode === 'photorealistic' ? 'bg-[#D97706] text-[#FFFDF5]' : 'text-[#E5C158] hover:text-[#FFFDF5]'
                  }`}
                >
                  PBR Marble
                </button>
                <button
                  onClick={() => setRenderMode('wireframe')}
                  className={`px-3 py-1 rounded text-xs font-serif-royal font-semibold transition-colors ${
                    renderMode === 'wireframe' ? 'bg-[#D97706] text-[#FFFDF5]' : 'text-[#E5C158] hover:text-[#FFFDF5]'
                  }`}
                >
                  Wireframe Mesh
                </button>
              </div>

            </div>

          </div>

          {/* Guided Virtual Tour Navigation Control Bar */}
          {isTourActive && (
            <div className="bg-[#2D0A0E] border border-[#D4AF37]/50 p-4 rounded-xl flex items-center justify-between text-xs text-[#E5C158]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-bold text-[#FFFDF5] font-serif-royal">VIRTUAL TOUR ({tourStepIndex + 1} / {TAJ_PARTS.length}):</span>
                <span className="font-semibold text-[#D4AF37]">{TAJ_PARTS[tourStepIndex].name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTourStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={tourStepIndex === 0}
                  className="px-3 py-1 rounded bg-[#1E0609] border border-[#D4AF37]/30 hover:bg-[#3D0F14] text-[#FFFDF5] disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setTourStepIndex(prev => Math.min(TAJ_PARTS.length - 1, prev + 1))}
                  disabled={tourStepIndex === TAJ_PARTS.length - 1}
                  className="px-3 py-1 rounded bg-[#D97706] hover:bg-[#F59E0B] text-[#FFFDF5] font-bold disabled:opacity-40"
                >
                  Next Part
                </button>
              </div>
            </div>
          )}

          {/* Historical Era Timeline Slider */}
          <div className="heritage-card p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#FFFDF5] font-semibold font-serif-royal">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>Historical Era Timeline: {temporalYear} CE</span>
              </div>
              <span className="text-[#D4AF37] font-serif-playfair italic">
                {temporalYear === 2026 ? '2026 CE (Present Day View)' : temporalYear < 1700 ? '1632 CE (Original Construction)' : '1850 CE (Historical Record)'}
              </span>
            </div>

            <input
              type="range"
              min="1632"
              max="2026"
              step="10"
              value={temporalYear}
              onChange={(e) => setTemporalYear(parseInt(e.target.value))}
              className="w-full h-2 bg-[#1E0609] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />

            <div className="flex justify-between text-[11px] text-[#E5C158]/70">
              <span>1632 CE (Construction Era)</span>
              <span>1750 CE (Mughal Era)</span>
              <span>1850 CE (Colonial Era)</span>
              <span>2026 CE (Present View)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Explanation Modal / Fact Cards */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Part Explanation Card */}
          {selectedPart ? (
            <div className="heritage-card p-5 border-[#D4AF37] shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 font-serif-royal">
                  <Info className="w-4 h-4" /> Part Selected
                </span>
                <button
                  onClick={() => setSelectedPart(null)}
                  className="text-[#E5C158]/70 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5]">{selectedPart.name}</h3>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-1">
                <span className="text-[11px] font-semibold text-[#D4AF37] block font-serif-royal">Explanation:</span>
                <p className="text-xs text-[#FFFDF5] leading-relaxed">{selectedPart.shortDesc}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-1">
                <span className="text-[11px] font-semibold text-[#F59E0B] block font-serif-royal">Architecture Detail:</span>
                <p className="text-xs text-[#E5C158]/90 leading-relaxed font-serif-playfair italic">{selectedPart.details}</p>
              </div>
            </div>
          ) : (
            <div className="heritage-card p-5 space-y-3 text-center">
              <HelpCircle className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">Inspect Any Angle</h3>
              <p className="text-xs text-[#E5C158]/80 font-serif-playfair leading-relaxed">
                Drag mouse or swipe on screen to rotate the 3D Taj Mahal model freely 360°. Click camera preset buttons like <strong className="text-[#D4AF37]">Back View</strong>, <strong className="text-[#D4AF37]">Left Side</strong>, or <strong className="text-[#D4AF37]">Right Side</strong>!
              </p>
            </div>
          )}

          {/* Historical Fact Cards */}
          <div className="heritage-card p-5 space-y-3">
            <h3 className="text-sm font-bold font-serif-royal text-gold-gradient border-b border-[#D4AF37]/25 pb-2">Quick Architectural Facts</h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                <span className="text-[#D4AF37] font-semibold font-serif-royal block mb-0.5">Four-Sided Symmetry:</span>
                <p className="text-[#FFFDF5]">The main mausoleum has identical front, rear, and side facade arches creating flawless bilateral symmetry.</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                <span className="text-[#F59E0B] font-semibold font-serif-royal block mb-0.5">Material & Craftsmanship:</span>
                <p className="text-[#FFFDF5]">Built using translucent white Makrana marble from Rajasthan transported by 1,000 elephants.</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                <span className="text-[#10B981] font-semibold font-serif-royal block mb-0.5">World Recognition:</span>
                <p className="text-[#FFFDF5]">UNESCO World Heritage Site & one of the New 7 Wonders of the World.</p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow border border-[#D4AF37]/40">
              <Download className="w-4 h-4 text-[#FFFDF5]" />
              <span>Download Taj_Mahal_3D.gltf</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
