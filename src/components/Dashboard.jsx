/**
 * VIRASAT - Dashboard / Home Overview Component (1st-Year CS Student Project)
 * 
 * Purpose: Main overview landing page summarizing the Indian heritage platform.
 */

import React from 'react';
import { Landmark, ArrowRight, PlusCircle, BookOpen, Search, MapPin } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function Dashboard({ setActiveTab, sitesList }) {
  const allSites = sitesList || HERITAGE_SITES;
  const uniqueStatesCount = new Set(allSites.map(s => s.state)).size;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Student Project Hero Banner */}
      <div className="bg-gradient-to-br from-[#3D0F14] via-[#2D0A0E] to-[#1E0609] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0E17] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-serif-royal">
              <span>𑀯𑀺𑀭𑀸𑀲𑀢𑁆 • Student Mini-Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif-royal text-gold-gradient tracking-wide">
              Welcome to Virasat
            </h1>

            <p className="text-[#E5C158]/90 text-sm leading-relaxed font-serif-playfair">
              A foundational Indian Cultural Heritage platform developed as a 1st-year B.Tech CS project to document 
              famous monuments, filter historical sites by region, and crowdsource community submissions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('monuments')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs tracking-wider transition-all cursor-pointer shadow-lg border border-[#D4AF37]/40"
              >
                <Landmark className="w-4 h-4 text-[#FFFDF5]" />
                <span>Explore Monuments</span>
              </button>

              <button
                onClick={() => setActiveTab('add')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#58141C] text-[#D4AF37] text-xs font-serif-royal font-semibold transition-colors border border-[#D4AF37]/30"
              >
                <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Submit Monument</span>
              </button>
            </div>
          </div>

          {/* Project Quick Stats */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-[260px]">
            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-semibold mb-1 font-serif-royal">
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
                <span>DIRECTORY</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">{allSites.length} Sites</div>
              <div className="text-[11px] text-[#E5C158]/70">Registered Monuments</div>
            </div>

            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-[#F59E0B] text-xs font-semibold mb-1 font-serif-royal">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
                <span>COVERAGE</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">{uniqueStatesCount} States</div>
              <div className="text-[11px] text-[#E5C158]/70">Indian Regions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div
          onClick={() => setActiveTab('monuments')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              Monuments Directory
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Browse the catalog of Indian heritage sites with state filtering and search functions.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>View Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('add')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              Crowdsource Form
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Submit a new regional monument entry with state, era, image URL, and historical details.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>Add Entry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('about')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              Viva Preparation Guide
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Review code structure, tech stack breakdown, and core interview defense Q&As.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>Read Viva Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Featured Showcase: Taj Mahal & Shri Ram Janmabhoomi Mandir */}
      <div className="heritage-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <h2 className="text-lg font-bold font-serif-royal text-gold-gradient">
                Spotlight Heritage Monuments
              </h2>
            </div>
            <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
              Explore 3D historical reconstructions of Taj Mahal & Shri Ram Janmabhoomi Mandir
            </p>
          </div>
          <button
            onClick={() => setActiveTab('monuments')}
            className="text-xs text-[#D97706] hover:text-[#F59E0B] font-semibold flex items-center gap-1 font-serif-royal cursor-pointer"
          >
            <span>View All ({allSites.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight 2-Column Grid: Taj Mahal & Ram Mandir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allSites.slice(0, 2).map((site) => (
            <div
              key={site.id}
              className="bg-[#1E0609] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl overflow-hidden transition-all group shadow-xl flex flex-col justify-between"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0609] via-transparent to-transparent opacity-85" />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-[#4A0E17] text-[#D4AF37] text-[10px] font-serif-royal font-semibold border border-[#D4AF37]/40 shadow">
                  {site.state}
                </span>
                <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-[#2D0A0E]/90 text-emerald-400 text-[10px] font-mono font-semibold border border-[#D4AF37]/30">
                  {site.status}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs text-[#F59E0B] font-serif-playfair italic">
                    {site.location} • {site.dynasty}
                  </p>
                  <p className="text-xs text-[#E5C158]/80 line-clamp-2 mt-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2 mt-3">
                  <span className="text-[11px] text-[#D4AF37] font-serif-royal">
                    {site.architecturalStyle?.split('(')[0]}
                  </span>
                  <button
                    onClick={() => onSelectSite ? onSelectSite(site) : setActiveTab('3dtwins')}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] text-xs font-serif-royal font-bold shadow border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>View in 3D</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
