/**
 * VIRASAT - Add Monument Crowdsourcing Form Component (1st-Year CS Student Project)
 * 
 * Purpose: Allows students or heritage enthusiasts to submit a new monument entry.
 * Student Concepts Used:
 * - Controlled React Inputs: Binding form inputs to React useState variables.
 * - Form Validation: Checking required fields before submission.
 * - Event Handling: e.preventDefault() to handle form submission without page reload.
 */

import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Landmark, Image, MapPin, Calendar } from 'lucide-react';

export default function AddMonumentForm({ onAddMonument }) {
  // Step 1: Define state variables for every form field (Controlled Components)
  const [name, setName] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [location, setLocation] = useState('');
  const [dynasty, setDynasty] = useState('');
  const [builtEra, setBuiltEra] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  
  // Feedback status state
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 2: Handle Form Submit Action
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents full browser page reload

    // Basic Validation Check
    if (!name.trim() || !description.trim()) {
      setErrorMessage('Please fill in the Monument Name and Historical Description.');
      return;
    }

    // Construct New Monument Object
    const newMonument = {
      id: `custom-monument-${Date.now()}`,
      name: name.trim(),
      state: state.trim(),
      location: location.trim() || `${name}, ${state}`,
      dynasty: dynasty.trim() || 'Indian Historical Dynasty',
      builtEra: builtEra.trim() || 'Ancient Era',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      description: description.trim(),
      crowdLevel: 'MODERATE',
      crowdPercentage: 45
    };

    // Pass data back up to parent App state
    if (onAddMonument) {
      onAddMonument(newMonument);
    }

    // Reset Form Fields
    setName('');
    setLocation('');
    setDynasty('');
    setBuiltEra('');
    setImageUrl('');
    setDescription('');
    setErrorMessage('');
    setSuccessMessage(true);

    // Auto-hide success banner after 4 seconds
    setTimeout(() => {
      setSuccessMessage(false);
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Page Title */}
      <div className="border-b border-[#D4AF37]/25 pb-4">
        <h1 className="text-2xl font-bold font-serif-royal text-gold-gradient">
          Crowdsource Monument Submission
        </h1>
        <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
          Help us expand Virasat by submitting details for lesser-known regional Indian heritage sites.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-[#1E0609] border border-emerald-500/50 flex items-center gap-3 text-emerald-400 text-xs font-semibold shadow">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Monument successfully submitted! It has been added to your session directory.</span>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#4A0E17] border border-red-500/50 text-red-300 text-xs font-semibold shadow">
          {errorMessage}
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="heritage-card p-6 space-y-5">
        
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-3">
          <Landmark className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-base font-bold font-serif-royal text-[#FFFDF5]">
            Monument Entry Details
          </h2>
        </div>

        {/* Monument Name */}
        <div>
          <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
            Monument Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Shore Temple Mahabalipuram"
            className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Grid Row 1: State & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
              State / Region *
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37] font-serif-royal"
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Odisha">Odisha</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
              City / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mamallapuram, Chengalpattu district"
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Grid Row 2: Dynasty & Era */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
              Ruler / Dynasty
            </label>
            <input
              type="text"
              value={dynasty}
              onChange={(e) => setDynasty(e.target.value)}
              placeholder="e.g., Pallava Dynasty"
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
              Construction Era (Century / Year)
            </label>
            <input
              type="text"
              value={builtEra}
              onChange={(e) => setBuiltEra(e.target.value)}
              placeholder="e.g., 700 - 728 CE"
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Image URL Input */}
        <div>
          <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/monument-photo.jpg (or leave empty for default)"
            className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Historical Description Textarea */}
        <div>
          <label className="text-xs font-serif-royal font-semibold text-[#D4AF37] block mb-1">
            Historical & Architectural Description *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief overview of the monument's architectural significance, carvings, and cultural background..."
            className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg p-3 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37] leading-relaxed"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg border border-[#D4AF37]/40"
          >
            <PlusCircle className="w-4 h-4 text-[#FFFDF5]" />
            <span>SUBMIT MONUMENT TO VIRASAT DIRECTORY</span>
          </button>
        </div>

      </form>

    </div>
  );
}
