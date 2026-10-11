/**
 * VIRASAT - Monuments List Component (1st-Year CS Student Project)
 * 
 * Purpose: Displays a list of Indian heritage monuments in a clean grid layout.
 * Student Concepts Used:
 * - React useState hook to track search query and filter selection.
 * - Array.prototype.filter() and Array.prototype.map() to filter and render data.
 * - Simple modal popups to view full monument details.
 */

import React, { useState } from 'react';
import { Search, MapPin, Calendar, Info, X } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function MonumentsList({ sitesList, onSelectSite }) {
  // Step 1: Local state for search query and state filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [activeSiteModal, setActiveSiteModal] = useState(null);

  // Combine default sites with any student-added sites passed via props
  const allSites = sitesList || HERITAGE_SITES;

  // Step 2: Get unique states list for filter dropdown
  const uniqueStates = ['ALL', ...new Set(allSites.map(site => site.state))];

  // Step 3: Filter monuments based on search term and state dropdown
  const filteredSites = allSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.dynasty?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === 'ALL' || site.state === selectedState;
    
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Title & Header */}
      <div className="border-b border-[#D4AF37]/25 pb-4">
        <h1 className="text-2xl font-bold font-serif-royal text-gold-gradient">
          Indian Heritage Monuments Directory
        </h1>
        <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
          Explore key historical monuments across India with detailed architectural and historical information.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="heritage-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search monument name, city, or dynasty..."
            className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg pl-9 pr-4 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* State Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-[#D4AF37] font-serif-royal font-semibold whitespace-nowrap">
            Filter State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37] font-serif-royal"
          >
            {uniqueStates.map((st, idx) => (
              <option key={idx} value={st} className="bg-[#2D0A0E] text-[#FFFDF5]">
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monuments Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.length > 0 ? (
          filteredSites.map((site) => (
            <div
              key={site.id}
              className="heritage-card rounded-xl overflow-hidden flex flex-col justify-between heritage-card-hover group"
            >
              {/* Monument Image Container */}
              <div className="h-44 w-full overflow-hidden relative bg-[#1E0609]">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0609] via-transparent to-transparent opacity-80" />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-[#4A0E17] text-[#D4AF37] text-[10px] font-serif-royal font-semibold border border-[#D4AF37]/30 shadow">
                  {site.state}
                </span>
              </div>

              {/* Monument Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
                    {site.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-serif-playfair italic mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{site.location || site.state} • {site.dynasty}</span>
                  </div>
                  <p className="text-xs text-[#E5C158]/80 line-clamp-3 mt-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                {/* Card Action Button Row */}
                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2 mt-2">
                  <button
                    onClick={() => setActiveSiteModal(site)}
                    className="px-2.5 py-1 rounded bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-serif-royal font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectSite) onSelectSite(site);
                    }}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] text-xs font-serif-royal font-bold shadow border border-[#D4AF37]/40 flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span>View in 3D</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full heritage-card p-8 text-center text-[#E5C158]/70 font-serif-playfair">
            No monuments matched your search query. Try resetting your state filter.
          </div>
        )}
      </div>

      {/* Monument Full Information Modal */}
      {activeSiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140305]/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#2D0A0E] rounded-2xl border border-[#D4AF37]/50 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div>
                <span className="text-xs text-[#D4AF37] font-serif-royal font-semibold uppercase">Monument Details</span>
                <h2 className="text-xl font-bold font-serif-royal text-gold-gradient">{activeSiteModal.name}</h2>
              </div>
              <button
                onClick={() => setActiveSiteModal(null)}
                className="p-1 rounded text-[#E5C158]/70 hover:text-white hover:bg-[#4A0E17] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 w-full rounded-xl overflow-hidden border border-[#D4AF37]/30">
              <img
                src={activeSiteModal.imageUrl}
                alt={activeSiteModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs text-[#FFFDF5]">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">State / Region:</span>
                  <p>{activeSiteModal.state} ({activeSiteModal.location})</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Dynasty / Era:</span>
                  <p>{activeSiteModal.dynasty || 'Ancient India'} • {activeSiteModal.builtEra || activeSiteModal.era}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                <span className="text-[#F59E0B] font-serif-royal font-semibold block">Historical Significance:</span>
                <p className="leading-relaxed text-[#E5C158]/90 font-serif-playfair italic">
                  {activeSiteModal.description}
                </p>
              </div>

              {activeSiteModal.architecturalStyle && (
                <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Architectural Style:</span>
                  <p className="leading-relaxed">{activeSiteModal.architecturalStyle}</p>
                </div>
              )}

              {activeSiteModal.keyHighlights && activeSiteModal.keyHighlights.length > 0 && (
                <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1.5">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Architectural Highlights:</span>
                  <ul className="space-y-1">
                    {activeSiteModal.keyHighlights.map((h, i) => (
                      <li key={i} className="text-[#E5C158]/80 text-[11px] flex items-start gap-1.5">
                        <span className="text-[#F59E0B]">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#D4AF37]/20">
              <button
                onClick={() => setActiveSiteModal(null)}
                className="px-4 py-2 rounded-lg bg-[#3D0F14] text-[#E5C158] hover:text-white font-serif-royal text-xs border border-[#D4AF37]/30 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (onSelectSite) {
                    onSelectSite(activeSiteModal);
                  }
                  setActiveSiteModal(null);
                }}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-serif-royal font-bold text-xs border border-[#D4AF37]/40 shadow cursor-pointer"
              >
                Launch 3D Model
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
