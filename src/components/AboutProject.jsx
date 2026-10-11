/**
 * VIRASAT - About Project & Viva Defense Guide (1st-Year CS Student Project)
 * 
 * Purpose: Provides project overview, tech stack breakdown, and viva interview defense questions.
 */

import React from 'react';
import { Landmark, Code, BookOpen, CheckCircle2, Server } from 'lucide-react';

export default function AboutProject() {
  const techStack = [
    { name: 'HTML5 & <model-viewer>', desc: 'Standard HTML web component for 360° interactive 3D monument rendering and WebXR / AR support' },
    { name: 'Tailwind CSS', desc: 'Custom heritage visual theme, royal dark maroon palette, and responsive mobile grid' },
    { name: 'React.js (v18)', desc: 'State management (useState), event handlers, and component lifecycle' },
    { name: 'Node.js & Express.js', desc: 'REST API backend server (server.js) serving GET & POST /api/monuments JSON endpoints' },
    { name: 'Vite Bundler', desc: 'Fast ES-module development server and production build bundler' }
  ];

  const vivaQuestions = [
    {
      q: "Q1. How does the 3D Monument Viewer work on the frontend?",
      a: "We use Google's official <model-viewer> HTML web component script. It natively renders 3D GLTF models, provides mouse orbit drag, pinch zoom, camera presets, and WebXR AR support without writing hundreds of lines of complex custom WebGL code."
    },
    {
      q: "Q2. How is the Node.js / Express backend structured?",
      a: "Our server.js script uses Express middleware (express.json()) to handle CORS and serve REST endpoints: GET /api/monuments to fetch monument lists and POST /api/monuments to handle new submissions."
    },
    {
      q: "Q3. How is state managed across the React application?",
      a: "We use top-level state in App.jsx (using the useState hook) to manage activeTab navigation, selected site data, and pass data as props to child components."
    },
    {
      q: "Q4. How does the crowdsourcing form submit data to the backend?",
      a: "The form uses controlled inputs bound to useState. On submission, e.preventDefault() prevents page reloads, and the browser sends a POST fetch request to the Express backend API."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Page Title */}
      <div className="border-b border-[#D4AF37]/25 pb-4">
        <h1 className="text-2xl font-bold font-serif-royal text-gold-gradient">
          About Project Virasat & Viva Presentation Guide
        </h1>
        <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
          B.Tech Computer Science & Engineering • 1st-Year Semester Mini-Project Documentation
        </p>
      </div>

      {/* Project Mission Card */}
      <div className="heritage-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A0E17] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif-royal text-[#FFFDF5]">Project Mission Statement</h2>
            <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Department of Computer Science & Engineering</p>
          </div>
        </div>

        <p className="text-xs text-[#FFFDF5] leading-relaxed">
          <strong>VIRASAT</strong> is a foundational Indian cultural heritage web application featuring an interactive 
          3D monument viewer (&lt;model-viewer&gt;), regional monument directory, crowdsourced submission form, and a Node.js / Express 
          backend REST API.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="heritage-card p-6 space-y-4">
        <h2 className="text-base font-bold font-serif-royal text-[#FFFDF5] border-b border-[#D4AF37]/25 pb-2 flex items-center gap-2">
          <Code className="w-4 h-4 text-[#D4AF37]" />
          <span>Core Technology Stack (Foundational Web & Backend)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techStack.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold font-serif-royal text-[#D4AF37]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{item.name}</span>
              </div>
              <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Express API Endpoint Summary */}
      <div className="heritage-card p-6 space-y-4">
        <h2 className="text-base font-bold font-serif-royal text-[#FFFDF5] border-b border-[#D4AF37]/25 pb-2 flex items-center gap-2">
          <Server className="w-4 h-4 text-[#D4AF37]" />
          <span>Node.js / Express REST API Server Architecture</span>
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 font-mono text-[#E5C158]">
            <strong className="text-emerald-400">GET /api/monuments</strong> — Returns JSON array of registered monuments
          </div>
          <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 font-mono text-[#E5C158]">
            <strong className="text-[#F59E0B]">POST /api/monuments</strong> — Receives crowdsourced monument form submissions
          </div>
        </div>
      </div>

      {/* Viva Exam Defense Guide */}
      <div className="heritage-card p-6 space-y-4">
        <h2 className="text-base font-bold font-serif-royal text-[#FFFDF5] border-b border-[#D4AF37]/25 pb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#D4AF37]" />
          <span>Viva Interview Defense Notes (Key Questions & Answers)</span>
        </h2>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1.5">
              <h3 className="text-xs font-bold font-serif-royal text-[#F59E0B]">{item.q}</h3>
              <p className="text-xs text-[#FFFDF5] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
