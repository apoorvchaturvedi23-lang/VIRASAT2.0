# 🏛️ VIRASAT (विरासत) — Indian Heritage Exploration Platform in 3D

> **First-Year B.Tech Computer Science & Engineering Capstone Project**  
> An interactive full-stack web platform allowing users to explore India's iconic monuments, search architectural landmarks and historical figures, inspect genuine 3D WebGL reconstructions with 360° rotation and zoom, identify monuments using **live camera & photo visual search**, and learn about the civilizational history of Bharat.

---

## 🌟 1. Project Overview

**Virasat** (*विरासत* — meaning *"Heritage"* in Hindi) is a full-stack Indian monument discovery and 3D time-travel platform built deliberately using clean, accessible web fundamentals. Instead of static textbook articles or flat 2D picture galleries, Virasat offers an interactive, multi-dimensional learning experience:

1. **Opening Cinematic Welcome Screen (`/`)**: Immersive Indian heritage entryway featuring ivory, maroon, and antique gold aesthetics, inviting visitors to *"Enter Virasat →"*.
2. **Searchable Heritage Dashboard (`/explore.html`)**: Real-time multi-field search across 20 curated Indian monuments, filtering by 8 architectural categories, states/regions, UNESCO World Heritage status, and working 3D model availability.
3. **Camera-Based & Photo Visual Search (NEW)**:
   - **Option A (Take a Photo):** Activates device camera (`navigator.mediaDevices.getUserMedia`) prioritizing rear mobile lenses (`facingMode: environment`).
   - **Option B (Upload Image):** File drag-and-drop supporting JPEG, PNG, WebP with native mobile `capture="environment"` fallback.
   - **In-Memory Palette Analysis:** HTML5 Canvas extracts RGB color profiles to identify material signatures (*White Marble*, *Red Sandstone*, *Basalt Caves*, *Carved Granite*).
   - **Privacy First:** Camera tracks terminate immediately upon capture (`track.stop()`), and images are processed transiently without permanent storage.
   - **Honest Candidate Matching:** Candidates in *"Monuments That May Match Your Photo"* explain match rationale (*"Matched: White Marble & Domed Architecture"*) without fabricated AI percentages.
4. **Interactive 3D Time-Travel (`/monument.html?id=...`)**: Hardware-accelerated 3D WebGL visualization powered by Google `<model-viewer>` for flagship monuments:
   - **Taj Mahal** (Agra, Uttar Pradesh) — The pinnacle of Mughal marble architecture.
   - **Shri Ram Janmabhoomi Mandir** (Ayodhya, Uttar Pradesh) — Nagara-style stone temple marvel.
   - Honest *“Photogrammetry Reconstruction in Progress”* status for remaining monuments.
5. **Historical Figures Directory (`/figures.html`) & Dossiers (`/figure.html?id=...`)**: Detailed profiles of 10 legendary emperors, queens, architects, and spiritual masters with bidirectional monument cross-links.
6. **Academic Viva Defense Guide (`/about.html`)**: Full technical architecture documentation and 11 viva defense questions and answers.

---

## 🚀 2. Live Application Link & Starting the Server

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 16 or newer installed).
- Modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Starting the Application
```bash
# 1. Install dependencies (Express, CORS, Three.js)
npm install

# 2. Start the Virasat backend server
npm start
```

### Accessing the Web Application
Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

Direct navigation shortcuts:
- **Welcome Screen:** `http://localhost:3000/`
- **Explore Dashboard:** `http://localhost:3000/explore.html`
- **Visual Search Modal:** Click the 📷 camera icon on `http://localhost:3000/explore.html`
- **Taj Mahal 3D:** `http://localhost:3000/monument.html?id=taj-mahal`
- **Ram Mandir 3D:** `http://localhost:3000/monument.html?id=ram-mandir`
- **Historical Figures:** `http://localhost:3000/figures.html`
- **Shah Jahan Dossier:** `http://localhost:3000/figure.html?id=shah-jahan`
- **About & Viva Guide:** `http://localhost:3000/about.html`

---

## 🧪 3. Automated Test Verification Suites

Virasat includes two dedicated automated test suites covering all pages, APIs, and features:

```bash
# Test 1: Full Platform Suite (Pages, REST API, Filters, 3D Assets)
node scripts/testPlatform.js
# Expected: 21 / 21 TESTS PASSED (100%)

# Test 2: Visual Search Suite (Camera UI, Modal, Validation, Feature Matching)
node scripts/testVisualSearch.js
# Expected: 10 / 10 TESTS PASSED (100%)
```

---

## 🛠️ 4. Technology Stack & Architectural Rationale

| Layer | Technology | Architectural Rationale for 1st Year B.Tech CS |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) | Semantic markup, CSS Custom Properties (variables), Flexbox/Grid, and async `fetch()` with DOM manipulation. No React/Next.js/Tailwind bloat, keeping code transparent and viva-friendly. |
| **Visual Search & Camera** | HTML5 MediaDevices & Canvas APIs | Native `getUserMedia()` with `facingMode: environment` for mobile devices. HTML5 Canvas extracts RGB palettes in memory. Instant camera track shutdown for privacy. |
| **3D Rendering** | Google `<model-viewer>` | Standardized Web Component leveraging WebGL/WebXR. Delivers instant 360° mouse/touch orbit, pinch-to-zoom, auto-rotation, and mobile AR support. |
| **Backend** | Node.js & Express.js | Lightweight, fast asynchronous HTTP server providing static file serving and RESTful endpoints. Body parser configured with 10MB limit for image payloads. |
| **Data Layer** | In-Memory JavaScript Datasets (`data/monuments.js`, `data/figures.js`) | Normalized, bidirectional relational structure (monuments link to figures, figures link to monuments) without requiring external database setups (MongoDB/PostgreSQL). |
| **3D Asset Format** | Binary glTF (`.glb`) | Industry-standard "JPEG of 3D", bundling meshes, PBR textures, and materials into compact self-hosted binary files (`taj-mahal.glb`, `ram-mandir.glb`). |

---

## 📂 5. Project Directory Structure

```text
testsaas/
├── package.json               # Project manifest and npm scripts
├── server.js                  # Express backend: static serving, REST APIs & POST /api/visual-search
├── data/
│   ├── monuments.js           # 20 detailed Indian monuments (coordinates, styles, facts, ASI sources)
│   └── figures.js             # 10 historical figures (biographies, achievements, linked monuments)
├── public/                    # Static frontend directory served by Express
│   ├── index.html             # Screen 1: Cinematic Opening Welcome Page
│   ├── explore.html           # Screen 2: Explore Dashboard with text & visual camera search
│   ├── monument.html          # Screen 3: Reusable monument details & 3D model viewer
│   ├── figures.html           # Screen 4: Historical Figures directory
│   ├── figure.html            # Screen 5: Individual historical figure dossier
│   ├── about.html             # Screen 6: About Virasat & College Viva Defense Guide
│   ├── css/
│   │   └── style.css          # Authentic Indian heritage design + Visual Search & Camera modal styles
│   ├── js/
│   │   ├── explore.js         # Client script: debounced search, camera controller, visual search engine
│   │   ├── monument.js        # Client script: dynamic 3D loading, figures & architecture tabs
│   │   ├── figures.js         # Client script: historical figures catalog & search
│   │   └── figure.js          # Client script: figure dossier & associated monument cards
│   ├── images/
│   │   ├── taj-mahal.jpg      # High-resolution image for Taj Mahal
│   │   └── ram-mandir.jpg     # High-resolution image for Ram Mandir
│   └── models/
│       ├── taj-mahal.glb      # Real binary 3D model for Taj Mahal (309 KB)
│       └── ram-mandir.glb     # Real binary 3D model for Ram Mandir (190 KB)
├── scripts/
│   ├── generateModels.js      # Procedural 3D model generation script (Three.js GLTFExporter)
│   ├── testPlatform.js        # Automated verification suite (21 automated checks)
│   └── testVisualSearch.js    # Visual Search verification suite (10 automated checks)
└── README.md                  # Project documentation & viva presentation manual
```

---

## 🗺️ 6. User Journey & Navigation Flow

```text
┌──────────────────────────────────────────────┐
│           1. WELCOME SCREEN (/)              │
│  Cinematic Indian heritage hero, branding    │
│  and prominent "Enter Virasat →" button      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│       2. EXPLORE DASHBOARD (/explore.html)   │
│  - Text Search (name, dynasty, style)        │
│  - 📷 Camera / Photo Visual Search Button     │
│  - 8 Category filter chips + State selector  │
│  - UNESCO World Heritage toggle              │
│  - "Show 3D Models Only" toggle              │
└──────────────┬───────────────────────────────┘
               │
       ┌───────┴───────────────────────────────┐
       ▼                                       ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  3. MONUMENT DETAILS         │ │  4. HISTORICAL FIGURES       │
│  (/monument.html?id=...)     │ │  (/figures.html)             │
│  - Google <model-viewer>     │ │  - Directory of 10 figures   │
│    (Taj Mahal & Ram Mandir)  │ │  - Search by era & dynasty   │
│  - Architectural breakdown   │ └──────────────┬───────────────┘
│  - Associated figure cards   │                │
│  - ASI & NCERT sources       │                ▼
└──────────────┬───────────────┘ ┌──────────────────────────────┐
               │                 │  5. FIGURE DOSSIER           │
               └─────────────────►  (/figure.html?id=...)       │
               ◄─────────────────┤  - Portrait & biography      │
                                 │  - Milestone achievements    │
                                 │  - Linked monuments grid     │
                                 └──────────────────────────────┘
```

---

## 📷 7. Visual Search Architecture & Camera Permissions

### A. Camera Permissions and HTTPS / Localhost Lifecycle
- The camera is **never opened automatically** upon page load.
- It activates only when the user explicitly clicks the camera button and triggers the permission request via `navigator.mediaDevices.getUserMedia()`.
- On mobile devices, `facingMode: { ideal: "environment" }` instructs the operating system to prioritize the rear camera.
- As soon as a photo is captured or the user closes the modal, **all media tracks are explicitly terminated** (`stream.getTracks().forEach(t => t.stop())`), immediately turning off the device's camera hardware indicator light.
- If permission is denied or no webcam is found, a friendly fallback immediately guides the user to the file upload tab.

### B. In-Memory Processing & Privacy Guarantee
- Uploaded and captured photographs are drawn into an off-screen HTML5 `<canvas>`.
- Client-side code calculates the RGB color distribution and brightness histogram:
  - **White Marble Palette:** Matches Taj Mahal and Victoria Memorial.
  - **Red Sandstone Palette:** Matches Red Fort, Agra Fort, Qutub Minar, Humayun's Tomb.
  - **Basalt Rock Excavation:** Matches Ajanta Caves and Ellora Caves.
  - **Carved Sandstone & Granite:** Matches Ram Mandir, Konark Sun Temple, Hampi.
- Photos are sent transiently in JSON to `POST /api/visual-search` and are **never saved to disk or permanently stored**.

### C. Honest Presentation
- We do **not** display fabricated neural network percentages (e.g. "98.7% AI Confidence").
- Instead, candidate cards in *"Monuments That May Match Your Photo"* display clear, explainable match badges (e.g., `🎯 Matched: White Marble & Domed Architecture`, `🎯 Regional Match: Ayodhya`, `🎯 Matched Category: Forts & Palaces`).

---

## 📡 8. REST API Reference

### Monuments Endpoints
- `GET /api/monuments` — Multi-field search, category, state, and UNESCO filtering.
- `GET /api/monuments/:id` — Single monument details with resolved historical figures.

### Visual Search Endpoint
- `POST /api/visual-search`
  - Accepts JSON payload:
    ```json
    {
      "imageBase64": "data:image/jpeg;base64,...",
      "category": "Tombs & Mausoleums",
      "clue": "White marble",
      "detectedPalette": "white_marble"
    }
    ```
  - Validates format (JPEG/PNG/WebP) and file size (< 5MB).
  - Returns matched candidates ranked by architectural characteristics with explainable `matchReason` tags.

### Historical Figures Endpoints
- `GET /api/figures` — Directory search across 10 figures.
- `GET /api/figures/:id` — Figure dossier with resolved associated monument cards.

### Metadata Endpoint
- `GET /api/categories` — Aggregates category counts, states list, and 3D models count.

---

## 🎓 9. College Viva Defense Cheatsheet (Top Viva Questions)

1. **How does the Visual Search feature work, and how do you protect user privacy?**  
   *Answer:* Visual search uses the browser's native `MediaDevices` API (`getUserMedia`) with `facingMode: environment`. Camera access requires an explicit user click. Once captured, all video tracks are terminated immediately (`track.stop()`) so the camera is released. Photos are processed in memory using the HTML5 Canvas API and are never stored on the server.

2. **Why didn't you use a heavy neural network like TensorFlow for the photo search?**  
   *Answer:* Generic image classifiers often identify general objects like "building" or "house" but cannot reliably distinguish between a 17th-century Mughal mausoleum and a 20th-century colonial memorial. Rather than embedding a heavy 50MB model or faking AI confidence numbers, we built an honest architectural heuristic engine combining RGB palette analysis on the canvas with category and clue filtering against our verified ASI dataset.

3. **Why did you use Google `<model-viewer>` instead of writing raw WebGL?**  
   *Answer:* `<model-viewer>` is the official, open-source Web Component backed by Google and built on Three.js. Writing raw WebGL shaders, camera matrices, pinch-to-zoom math, and WebXR bindings introduces hundreds of lines of error-prone boilerplate. `<model-viewer>` is declarative, accessible, and provides responsive canvas resizing with hardware-accelerated 60 FPS performance.

4. **Why Vanilla JavaScript instead of React or Next.js?**  
   *Answer:* In 1st-year computer science, the academic goal is mastering foundational web engineering: semantic HTML, the CSS box model, asynchronous execution (Promises/Fetch), the Event Loop, and DOM manipulation. Vanilla JS keeps page load times instant, eliminates build bundlers, and makes the code 100% transparent and viva-friendly.

5. **How are 3D models handled for monuments that do not have 3D assets yet?**  
   *Answer:* We practice academic honesty. Rather than faking 3D assets or showing broken models, each monument has a `hasModel` boolean. If true (Taj Mahal & Ram Mandir), `<model-viewer>` is mounted. If false, an honest status banner (*"3D Digital Twin Under Photogrammetry Reconstruction"*) is presented, while retaining all verified architectural and historical details.

---

## 📜 10. Academic Integrity & Cultural Sources
Historical descriptions, architectural classifications, and dates have been cross-referenced with:
- **Archaeological Survey of India (ASI)** — National monuments records.
- **UNESCO World Heritage Centre** — Inscription criteria and boundary documentation.
- **NCERT History Textbooks** — Class 7, 8 & 11 Indian Culture & Medieval Architecture.
- **Encyclopaedia Britannica** — Verified biographical records of Indian rulers.

© 2026 Virasat Heritage Project — Built with pride for Indian Heritage Preservation & Educational Innovation.
