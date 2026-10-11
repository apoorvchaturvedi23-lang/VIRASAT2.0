/**
 * VIRASAT - 3D Monument Viewer Component (1st-Year CS Student Project)
 * 
 * Purpose: Renders interactive 3D historical reconstructions of monuments.
 * Student Concepts Used:
 * 1. Web Component `<model-viewer>`: Standard HTML web component for 3D GLTF rendering with 360° orbit rotation.
 * 2. React `useRef` & `useState`: Manages camera angle presets, auto-rotate toggles, and hotspot selections.
 * 3. WebXR / AR Integration: Standard `ar` attribute allows mobile devices to project the monument in AR.
 */

import React, { useState, useRef } from 'react';
import { 
  Box, 
  RotateCw, 
  RefreshCw, 
  Sparkles, 
  Info, 
  Smartphone, 
  Compass, 
  HelpCircle,
  MapPin,
  Landmark,
  CheckCircle2
} from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function ModelViewer3D({ selectedSite, onSelectSite }) {
  const currentSite = selectedSite || HERITAGE_SITES[0];
  const modelViewerRef = useRef(null);

  // States
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [currentPreset, setCurrentPreset] = useState('Three-Quarter View');

  // Hotspot details for Taj Mahal
  const TAJ_HOTSPOTS = [
    {
      id: 'dome',
      name: 'Main Onion Dome (Amrud)',
      shortDesc: 'Central 35-meter tall translucent Makrana marble dome topped with a lotus collar and brass finial spire.',
      cameraOrbit: '0deg 60deg 14m'
    },
    {
      id: 'entrance',
      name: 'Main Entrance Arch (Pishtaq)',
      shortDesc: '33-meter high vaulted entrance archway inscribed with Quranic calligraphic verses in black marble.',
      cameraOrbit: '0deg 85deg 10m'
    },
    {
      id: 'minarets',
      name: '4 Corner Minarets',
      shortDesc: 'Four 40-meter tall marble towers standing at the corners of the plinth, tilted 2° outwards for earthquake protection.',
      cameraOrbit: '45deg 70deg 18m'
    },
    {
      id: 'plinth',
      name: 'Marble Base Terrace',
      shortDesc: 'Raised square plinth standing 7 meters above the red sandstone garden courtyard alongside the Yamuna River.',
      cameraOrbit: '90deg 80deg 16m'
    },
    {
      id: 'inlay',
      name: 'Pietra Dura (Parchin Kari)',
      shortDesc: 'Intricate floral inlays of semi-precious stones (lapis lazuli, jade, crystal, carnelian) embedded into the marble.',
      cameraOrbit: '15deg 80deg 8m'
    }
  ];

  // Hotspot details for Shri Ram Janmabhoomi Mandir
  const RAM_MANDIR_HOTSPOTS = [
    {
      id: 'shikhar',
      name: 'Main Shikhar Spire (161 Feet)',
      shortDesc: 'Soaring 161-foot Nagara-style central spire towering directly above the Garbhagriha, crowned with a gold Kalash and saffron flag.',
      cameraOrbit: '0deg 55deg 16m'
    },
    {
      id: 'garbhagriha',
      name: 'Garbhagriha (Sanctum Sanctorum)',
      shortDesc: 'The sacred inner sanctuary enshrining the 51-inch Krishna Shila (black stone) idol of 5-year-old Ram Lalla.',
      cameraOrbit: '0deg 80deg 10m'
    },
    {
      id: 'mandapas',
      name: 'Five Grand Mandapas',
      shortDesc: 'Five ceremonial pavilions: Nritya Mandap, Rang Mandap, Sabha Mandap, Prarthana Mandap, and Kirtan Mandap.',
      cameraOrbit: '45deg 75deg 15m'
    },
    {
      id: 'pillars',
      name: '392 Carved Sandstone Pillars',
      shortDesc: 'Three-storey pillars hand-carved with statues of Hindu gods, goddesses, Dashavatara, and apsaras made of pink Bansi Paharpur stone.',
      cameraOrbit: '90deg 75deg 12m'
    },
    {
      id: 'singh_dwar',
      name: 'Singh Dwar & 32 Granite Steps',
      shortDesc: 'The majestic eastern grand entrance featuring 32 steps and large stone sculptures of elephants, lions, and Hanuman.',
      cameraOrbit: '270deg 80deg 14m'
    }
  ];

  // Default Hotspots for other monuments
  const DEFAULT_HOTSPOTS = [
    {
      id: 'vimana',
      name: 'Main Central Tower / Sanctum',
      shortDesc: 'The central architectural tower reflecting the classical stone carving tradition of the dynasty.',
      cameraOrbit: '0deg 65deg 15m'
    },
    {
      id: 'facade',
      name: 'Ornamental Facade & Reliefs',
      shortDesc: 'Carved stone panels depicting historical folklore, cosmological deities, and royal processions.',
      cameraOrbit: '45deg 80deg 12m'
    },
    {
      id: 'courtyard',
      name: 'Heritage Plinth & Courtyard',
      shortDesc: 'The monumental stone base engineered to distribute weight and provide circumambulation space.',
      cameraOrbit: '90deg 85deg 18m'
    }
  ];

  // Determine active hotspots based on selected monument
  const isTaj = currentSite.id === 'site-006' || currentSite.name.toLowerCase().includes('taj');
  const isRamMandir = currentSite.id === 'site-ram-mandir' || currentSite.name.toLowerCase().includes('ram');

  const activeHotspots = isRamMandir 
    ? RAM_MANDIR_HOTSPOTS 
    : isTaj 
    ? TAJ_HOTSPOTS 
    : DEFAULT_HOTSPOTS;

  // Camera Presets
  const PRESETS = [
    { name: 'Three-Quarter View', orbit: '45deg 75deg 18m' },
    { name: 'Front View', orbit: '0deg 75deg 15m' },
    { name: 'Right Side View', orbit: '90deg 75deg 15m' },
    { name: 'Back View', orbit: '180deg 75deg 15m' },
    { name: 'Left Side View', orbit: '270deg 75deg 15m' },
    { name: 'Top Aerial View', orbit: '0deg 15deg 22m' }
  ];

  // Handler: Change Camera Angle Preset
  const handlePresetClick = (preset) => {
    setCurrentPreset(preset.name);
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = preset.orbit;
    }
  };

  // Handler: Select Hotspot
  const handleHotspotClick = (part) => {
    setSelectedPart(part);
    if (modelViewerRef.current && part.cameraOrbit) {
      modelViewerRef.current.cameraOrbit = part.cameraOrbit;
    }
  };

  // Handler: Reset View
  const handleResetView = () => {
    setCurrentPreset('Three-Quarter View');
    setSelectedPart(null);
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = '45deg 75deg 18m';
      modelViewerRef.current.resetTurntableRotation();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">
              VIRASAT — 3D Monument Digital Twin Viewer
            </h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
            Interactive 360° historical 3D model viewer with orbit drag, zoom, and WebXR / AR support.
          </p>
        </div>

        {/* Quick Monument Selectors (Taj Mahal & Ram Mandir Buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          {HERITAGE_SITES.map((site) => {
            const isSelected = site.id === currentSite.id;
            return (
              <button
                key={site.id}
                onClick={() => {
                  if (onSelectSite) onSelectSite(site);
                  setSelectedPart(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif-royal font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] border border-[#D4AF37] shadow'
                    : 'bg-[#1E0609] text-[#E5C158]/80 hover:bg-[#3D0F14] border border-[#D4AF37]/30'
                }`}
              >
                {site.name === 'Taj Mahal' ? '🕌 Taj Mahal' : site.name.includes('Ram') ? '🛕 Ram Mandir' : site.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Viewer Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive 3D Model Display */}
        <div className="lg:col-span-8 space-y-4">
          <div className="heritage-card p-2 relative rounded-2xl overflow-hidden border-[#D4AF37]/40 shadow-2xl bg-[#140305]">
            
            {/* Standard Google HTML <model-viewer> Element */}
            <div className="w-full h-[460px] relative bg-gradient-to-b from-[#2D0A0E] via-[#1E0609] to-[#140305] rounded-xl overflow-hidden">
              
              <model-viewer
                ref={modelViewerRef}
                src={currentSite.modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb"}
                alt={`3D Model of ${currentSite.name}`}
                camera-controls
                touch-action="pan-y"
                auto-rotate={isAutoRotate ? "" : null}
                rotation-per-second="15deg"
                camera-orbit="45deg 75deg 18m"
                field-of-view="30deg"
                min-camera-orbit="auto auto 6m"
                max-camera-orbit="auto auto 30m"
                ar
                ar-modes="webxr scene-viewer quick-look"
                shadow-intensity="1.5"
                shadow-softness="0.8"
                exposure="1.0"
                style={{ width: '100%', height: '100%' }}
              >
                {/* Hotspot buttons rendered directly inside model-viewer */}
                {activeHotspots.map((part) => (
                  <button
                    key={part.id}
                    slot={`hotspot-${part.id}`}
                    data-position="0 5 0"
                    data-normal="0 1 0"
                    onClick={() => handleHotspotClick(part)}
                    className="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#FFFDF5] shadow-lg animate-pulse hover:scale-125 transition-transform cursor-pointer"
                    title={part.name}
                  />
                ))}
              </model-viewer>

              {/* Overlay Top Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="bg-[#1E0609]/90 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg text-xs text-[#D4AF37] font-serif-royal font-semibold flex items-center gap-2 shadow pointer-events-auto">
                  <Compass className="w-4 h-4 text-[#F59E0B]" />
                  <span>3D VIEW: {currentPreset.toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={handleResetView}
                    className="px-2.5 py-1 text-xs font-serif-royal font-semibold bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] rounded border border-[#D4AF37]/30 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset View</span>
                  </button>

                  <button
                    onClick={() => setIsAutoRotate(!isAutoRotate)}
                    className={`px-3 py-1 rounded text-xs font-serif-royal font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      isAutoRotate
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] border border-[#D4AF37]/40'
                        : 'bg-[#3D0F14] text-[#E5C158] border border-[#D4AF37]/30'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isAutoRotate ? 'Auto Rotate' : 'Manual Drag'}</span>
                  </button>
                </div>
              </div>

              {/* Camera Presets Bar Floating Center */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 justify-center pointer-events-auto">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetClick(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif-royal font-medium transition-all shadow cursor-pointer ${
                      currentPreset === preset.name
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-bold border border-[#D4AF37]'
                        : 'bg-[#1E0609]/90 hover:bg-[#3D0F14] text-[#E5C158] border border-[#D4AF37]/30'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* Hotspot Parts Selector Row */}
          <div className="heritage-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif-royal font-semibold text-[#D4AF37] block">
                {currentSite.name} — Architectural Hotspots:
              </span>
              <span className="text-[11px] text-[#E5C158]/70 font-serif-playfair italic">Click a hotspot to focus view</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeHotspots.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleHotspotClick(part)}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif-royal font-semibold transition-all cursor-pointer shadow ${
                    selectedPart?.id === part.id
                      ? 'bg-[#D4AF37] text-[#1E0609] ring-2 ring-[#F5E5AD] font-bold scale-105'
                      : 'bg-[#1E0609] hover:bg-[#4A0E17] text-[#FFFDF5] border border-[#D4AF37]/30'
                  }`}
                >
                  📍 {part.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Info & WebXR AR Instructions */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Part Card */}
          {selectedPart ? (
            <div className="heritage-card p-5 border-[#D4AF37] space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
                <span className="text-xs font-bold text-[#D4AF37] font-serif-royal flex items-center gap-1">
                  <Info className="w-4 h-4 text-[#F59E0B]" /> Hotspot Selected
                </span>
                <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded font-mono">
                  Active Focus
                </span>
              </div>
              <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5]">{selectedPart.name}</h3>
              <p className="text-xs text-[#E5C158]/90 leading-relaxed font-serif-playfair italic bg-[#1E0609] p-3 rounded-lg border border-[#D4AF37]/30">
                {selectedPart.shortDesc}
              </p>
            </div>
          ) : (
            <div className="heritage-card p-5 space-y-3 text-center">
              <HelpCircle className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">3D Controls & Hotspot Guide</h3>
              <p className="text-xs text-[#E5C158]/80 font-serif-playfair leading-relaxed">
                Drag to rotate 360°, scroll to zoom in/out. Click on any of the hotspot buttons below the model to focus on important architectural parts!
              </p>
            </div>
          )}

          {/* Monument Fact Summary */}
          <div className="heritage-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
              <h3 className="text-sm font-bold font-serif-royal text-gold-gradient">
                {currentSite.name} Details
              </h3>
              <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded font-serif-royal font-semibold border border-[#D4AF37]/30">
                {currentSite.state}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-0.5">
                <span className="text-[#D4AF37] font-serif-royal font-semibold block">Dynasty / Tradition & Era:</span>
                <p className="text-[#FFFDF5]">{currentSite.dynasty} • {currentSite.builtEra || currentSite.era}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-0.5">
                <span className="text-[#F59E0B] font-serif-royal font-semibold block">Architectural Style:</span>
                <p className="text-[#FFFDF5]">{currentSite.architecturalStyle}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-0.5">
                <span className="text-[#D4AF37] font-serif-royal font-semibold block">Historical Overview:</span>
                <p className="text-[#E5C158]/90 font-serif-playfair italic leading-relaxed">
                  {currentSite.description}
                </p>
              </div>

              {/* Key Architectural Highlights List */}
              {currentSite.keyHighlights && currentSite.keyHighlights.length > 0 && (
                <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1.5">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Architectural Highlights:</span>
                  <ul className="space-y-1">
                    {currentSite.keyHighlights.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#E5C158]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#2D0A0E] border border-[#D4AF37]/40 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-[#D4AF37] shrink-0" />
              <div className="text-[11px] text-[#E5C158]/90">
                <span className="font-bold text-[#FFFDF5] block font-serif-royal">WebXR / AR Support Ready</span>
                Open on mobile Chrome/Safari to project this 3D monument directly into your room!
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
