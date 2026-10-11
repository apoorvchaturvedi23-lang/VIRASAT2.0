import React, { useState } from 'react';
import { Search, Landmark, ArrowRight, Home } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function Header({ activeTab, setActiveTab, onOpenStartScreen, onSelectSite }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredSites = query.trim()
    ? HERITAGE_SITES.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.state.toLowerCase().includes(query.toLowerCase()) ||
        s.dynasty?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (site) => {
    setQuery('');
    setShowResults(false);
    setActiveTab('monuments');
  };

  return (
    <header className="bg-[#2D0A0E]/95 backdrop-blur border-b border-[#D4AF37]/30 px-4 lg:px-8 py-3.5 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Name strictly 'VIRASAT' */}
        <div 
          onClick={onOpenStartScreen} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Opening Screen"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#4A0E17] to-[#1E0609] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-wider text-gold-gradient font-serif-royal">
                VIRASAT
              </span>
              <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/40 font-semibold uppercase tracking-wider">
                Student Project
              </span>
            </div>
            <p className="text-[11px] text-[#E5C158]/75 hidden sm:block font-serif-playfair italic">B.Tech CS Semester Mini-Project</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#D4AF37]/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search monuments, states, dynasties..."
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Search Dropdown */}
          {showResults && filteredSites.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#2D0A0E] rounded-lg overflow-hidden shadow-2xl z-50 border border-[#D4AF37]/40 max-h-72 overflow-y-auto">
              <div className="px-3 py-1.5 text-xs text-[#D4AF37] bg-[#1E0609] border-b border-[#D4AF37]/30 flex justify-between font-serif-royal">
                <span>Monuments Search Results</span>
                <span>{filteredSites.length} items</span>
              </div>
              {filteredSites.map(site => (
                <div
                  key={site.id}
                  onClick={() => handleSelect(site)}
                  className="px-3 py-2 hover:bg-[#4A0E17] cursor-pointer flex items-center justify-between border-b border-[#D4AF37]/15 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-[#FFFDF5]">{site.name}</div>
                    <div className="text-xs text-[#E5C158]/70">{site.state} • {site.dynasty}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStartScreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold tracking-wider font-serif-royal transition-colors cursor-pointer"
            title="Go to Virasat Opening Screen"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Start Screen</span>
          </button>
        </div>

      </div>
    </header>
  );
}
